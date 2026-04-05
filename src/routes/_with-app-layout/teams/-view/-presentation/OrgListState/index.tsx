import { useBreakpoint } from '@/shared/libs/react-hooks/useBreakpoint';
import { FailedState } from '@/widgets/failed-state';
import { ResourceCard } from '@/widgets/resource-card';

function Loading() {
  const isDesktop = useBreakpoint('lg');

  if (isDesktop) {
    return (
      <div className="flex flex-col gap-2">
        <ResourceCard.ShimmerFull />
        <ResourceCard.ShimmerFull classNameWrapper="opacity-80" />
        <ResourceCard.ShimmerFull classNameWrapper="opacity-50" />
        <ResourceCard.ShimmerFull classNameWrapper="opacity-20" />
      </div>
    );
  }

  return (
    <div className="pb-2 grid grid-cols-2 sm:grid-cols-3 lg:flex lg:flex-col gap-1 sm:gap-2">
      <ResourceCard.ShimmerCompact />
      <ResourceCard.ShimmerCompact />
      <ResourceCard.ShimmerCompact />
      <ResourceCard.ShimmerCompact />
      <ResourceCard.ShimmerCompact />
      <ResourceCard.ShimmerCompact />
    </div>
  );
}

function Error({ error }: { error: Error }) {
  return (
    <div className="relative">
      <div className="opacity-50">
        <Loading />
      </div>

      <div className="absolute left-1/2 top-1/2 -translate-1/2 border p-4 pb-2 rounded-xl shadow-2xl bg-card">
        <FailedState.WallCentered errorPayload={error.stack || error.message} />
      </div>
    </div>
  );
}

export const OrgListState = {
  Loading,
  Error,
};
