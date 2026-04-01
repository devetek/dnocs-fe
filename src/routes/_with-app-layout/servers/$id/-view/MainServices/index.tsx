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
import { Button } from '@/shared/presentation/atoms/Button';
import CardSectionTitled from '@/shared/presentation/molecules/CardSectionTitled';

import { useServerDataModel } from '../../-model/server-data';

import { MainServicesStates as UIStates } from './_States';

const [guard, useServerServices] = guardedSelects({
  initialIsLoading: true,
  fallbackLoading: UIStates.Loading,
  fallbackError: UIStates.Failed,
})(
  couple(
    useServerDataModel as <R>(selector: (store: any) => R) => R,
    (s) => s.services,
  ),
);

const RunningServices = guard(() => {
  const [services] = useServerServices((s) => [s.list]);

  const [serverId, refreshServices] = useServerDataModel((s) => [
    s.serverId,
    s.refreshServices,
  ]);

  const [openServiceOverviewModal] = useServiceOverviewModal();

  const [handlePushServiceActivity] = usePushServiceActivityUsecase({
    onSuccess: () => refreshServices(),
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
  const [serverId, refreshServices] = useServerDataModel((s) => [
    s.serverId,
    s.refreshServices,
  ]);

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

  const handleClickRefresh = () => {
    refreshServices();
  };

  return (
    <CardSectionTitled
      icon={SettingsIcon}
      placement="main"
      title={t('common.terms.runningServices')}
      toolbarContent={
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" onClick={handleClickRefresh}>
            Refresh
          </Button>

          <Button size="sm" variant="outline" onClick={handleClickSeeMore}>
            {t('common.actions.seeMore')}
          </Button>
        </div>
      }
    >
      <div className="w-full flex flex-col gap-4">
        <RunningServices />
      </div>
    </CardSectionTitled>
  );
}
