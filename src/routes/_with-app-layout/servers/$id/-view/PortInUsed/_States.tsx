import ServicesTable from '@/entities/os-service/ui/presentation/ServicesTable';

import { FailedState } from '@/widgets/failed-state';

import { useEmit } from '../../-model/events';

function Empty() {
  return <div>No running services found.</div>;
}

function Loading() {
  return <ServicesTable.PlaceholderLoading />;
}

function Failed() {
  const emit = useEmit();

  const handleClickRetry = () => {
    emit('@servers::detail/server-services-refresh', null);
  };

  return (
    <div className="relative w-full">
      <div className="relative w-full opacity-30">
        <ServicesTable.PlaceholderLoading />
      </div>

      <div className="absolute left-1/2 top-1/2 -translate-1/2">
        <FailedState.BannerRetryable
          classNameWrapper="shadow-lg"
          onClickRetry={handleClickRetry}
        />
      </div>
    </div>
  );
}

export const MainServicesStates = {
  Empty,
  Loading,
  Failed,
};
