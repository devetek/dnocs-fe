import ServicesTable from '@/entities/os-service/ui/presentation/ServicesTable';
import usePushActivityUsecase from '@/entities/os-service/usecase/push-activity';

import { useServiceOverviewModal } from '@/features/service-overview-modal';

import {
  couple,
  guardedSelects,
} from '@/shared/libs/react-factories/guardedSelect';
import { Card } from '@/shared/presentation/atoms/Card';
import { FailedState } from '@/widgets/failed-state';

import { useEmit } from '../../-model/events';
import { useServiceDataModel } from '../../-model/service-data';

const [guard, useServices] = guardedSelects({
  fallbackError: () => <FailedState.WallCentered />,
})(couple(useServiceDataModel, (s) => s.services));

const RunningServices = guard(() => {
  const emit = useEmit();

  const [serverId] = useServiceDataModel((s) => [s.serverId]);
  const [services] = useServices((s) => [s.list]);

  const [openServiceOverviewModal] = useServiceOverviewModal();

  const [handlePushActivity] = usePushActivityUsecase({
    onSuccess: () => emit('@servers::services/services-refresh', null),
  });

  if (services.length === 0) {
    return <div>No running services found.</div>;
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
      services={services}
      onClickActivity={handlePushActivity}
    />
  );
});

export default function ServicesView() {
  return (
    <Card className="rounded-xl mt-4 p-2 overflow-auto">
      <RunningServices />
    </Card>
  );
}
