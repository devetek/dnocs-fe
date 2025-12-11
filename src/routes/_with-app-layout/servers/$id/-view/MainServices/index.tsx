import { useNavigate } from '@tanstack/react-router';
import { SettingsIcon } from 'lucide-react';

import { useDevetekTranslations } from '@/services/i18n';

import ServicesTable from '@/entities/os-service/ui/presentation/ServicesTable';
import usePushServiceActivityUsecase from '@/entities/os-service/usecase/push-activity';

import { useServiceOverviewModal } from '@/features/service-overview-modal';

import {
  couple,
  guardedSelects,
} from '@/shared/libs/react-factories/guardedSelect';
import CardSectionTitled from '@/shared/presentation/molecules/CardSectionTitled';

import { useEmit } from '../../-model/events';
import { useServerDataModel } from '../../-model/server-data';

import { MainServicesStates as UIStates } from './_States';

const [guard, useServerServices] = guardedSelects({
  initialIsLoading: true,
  fallbackLoading: UIStates.Loading,
  fallbackError: UIStates.Failed,
})(couple(useServerDataModel, (s) => s.services));

const RunningServices = guard(() => {
  const [services] = useServerServices((s) => [s.list]);

  const [serverId] = useServerDataModel((s) => [s.serverId]);

  const emit = useEmit();

  const [openServiceOverviewModal] = useServiceOverviewModal();

  const [handlePushServiceActivity] = usePushServiceActivityUsecase({
    onSuccess: () => emit('@servers::detail/server-services-refresh', null),
  });

  if (services.length === 0) {
    return <UIStates.Empty />;
  }

  return (
    <ServicesTable
      targetServerId={serverId}
      onClickServiceDetail={(serviceName) => {
        openServiceOverviewModal({
          serviceName,
          serverId,
        });
      }}
      onClickActivity={handlePushServiceActivity}
      services={services}
    />
  );
});

export default function MainServices() {
  const [serverId] = useServerDataModel((s) => [s.serverId]);

  const navigate = useNavigate();

  const t = useDevetekTranslations();

  const handleClickSeeMore = () => {
    navigate({
      to: '/servers/$id/running-services',
      params: {
        id: serverId,
      },
    });
  };

  return (
    <CardSectionTitled
      icon={SettingsIcon}
      placement="main"
      title={t('common.terms.runningServices')}
      toolbarActions={{
        label: t('common.actions.seeMore'),
        onClick: handleClickSeeMore,
      }}
    >
      <RunningServices />
    </CardSectionTitled>
  );
}
