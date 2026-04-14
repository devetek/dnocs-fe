import { Spinner } from '@/shared/presentation/atoms/Spinner';
import { FailedState } from '@/widgets/failed-state';

import { useEmit } from '../-model/events';

function Empty() {
  return <div>No network interface or used ports found.</div>;
}

function Loading() {
  return (
    <div className="w-full h-24 flex items-center justify-center">
      <Spinner />
    </div>
  );
}

function Failed() {
  const emit = useEmit();

  const handleRetry = () => {
    emit('@servers::detail/server-network-refresh', null);
  };

  return (
    <div className="w-full h-24 flex items-center justify-center">
      <FailedState.BannerRetryable
        classNameWrapper="w-max"
        onClickRetry={handleRetry}
      />
    </div>
  );
}

export const NetworkStates = {
  Empty,
  Loading,
  Failed,
};