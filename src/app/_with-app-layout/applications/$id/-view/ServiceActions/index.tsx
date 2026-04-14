import { PlayIcon, RotateCcwIcon, SquareIcon } from 'lucide-react';

import { useDevetekTranslations } from '@/services/i18n';

import type { SchemaOsServiceParts } from '@/entities/os-service/rules/schema';
import usePushServiceActivityUsecase from '@/entities/os-service/usecase/push-activity';

import { iife } from '@/shared/libs/browser/fn';

import { useAppDataModel } from '../../-model/app-data';
import { useArtifactHistoryModel } from '../../-model/artifact-history';
import { useEmit } from '../../-model/events';

import { ServiceActionsLayout as Layout } from './_presentation';
import { ServiceActionsStates as UIStates } from './_States';

export default function ServiceActions() {
  const emit = useEmit();
  const t = useDevetekTranslations();

  const [appDetail, selectedServerId] = useAppDataModel((s) => [
    s.appDetail,
    s.selectedServerId,
  ]);
  const [lastDeployment, deploymentHistory] = useArtifactHistoryModel((s) => [
    s.lastDeployment,
    s.deploymentHistory,
  ]);

  const [handlePushServiceActivity] = usePushServiceActivityUsecase({
    onSuccess: () => {
      emit('@applications::detail/app-detail-refresh', null);
    },
  });

  if (lastDeployment?.osService != null && selectedServerId) {
    const { serviceName, serviceState } = lastDeployment.osService;

    const handleClickActivity = (activity: SchemaOsServiceParts.Activity) => {
      return () => {
        handlePushServiceActivity({
          serviceName,
          activity,
          targetServerId: selectedServerId,
        });
      };
    };

    const isRunning = serviceState === 'running';
    const isStopped = serviceState === 'dead' || serviceState === 'exited';
    const isRestarting =
      serviceState === 'reload' ||
      serviceState === 'reloading' ||
      serviceState === 'restarting';

    return (
      <Layout.Frame>
        <Layout.Action
          isDisabled={isRunning}
          icon={PlayIcon}
          label={t('common.actions.start')}
          onClick={handleClickActivity('start')}
        />
        <Layout.Action
          isDisabled={isStopped}
          icon={SquareIcon}
          label={t('common.actions.stop')}
          onClick={handleClickActivity('stop')}
        />
        <Layout.Action
          isDisabled={isRestarting}
          icon={RotateCcwIcon}
          label={t('common.actions.restart')}
          onClick={handleClickActivity('restart')}
        />
      </Layout.Frame>
    );
  }

  const shouldUnavailable = iife(() => {
    if (appDetail.$status !== 'success') return false;

    if (!selectedServerId) return true;

    if (
      deploymentHistory.$status === 'success' &&
      lastDeployment?.osService == null
    ) {
      return true;
    }

    if (
      deploymentHistory.$status === 'loading' &&
      deploymentHistory.prevData != null &&
      lastDeployment?.osService == null
    ) {
      return true;
    }

    return false;
  });

  if (shouldUnavailable) {
    return <UIStates.Unavailable />;
  }

  return <UIStates.Loading />;
}
