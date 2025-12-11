import { useDevetekTranslations } from '@/services/i18n';

import { Card } from '@/shared/presentation/atoms/Card';
import { FailedState } from '@/widgets/failed-state';

import { ArtifactCard } from './_presentation';
import type { ArtifactsHistoryStateFailedProps as FailedProps } from './types';

const CardWrapper = ({ children = <></> }) => {
  return (
    <Card className="shadow-none p-2 flex items-center justify-center">
      {children}
    </Card>
  );
};

function Loading() {
  return (
    <>
      <ArtifactCard.ShimmerPlaceholder />
      <ArtifactCard.ShimmerPlaceholder />
      <ArtifactCard.ShimmerPlaceholder />
    </>
  );
}

function Failed(props: FailedProps) {
  const { error, onClickRetry } = props;

  return (
    <div className="relative">
      <div className="relative flex flex-col gap-2 opacity-50">
        <ArtifactCard.ShimmerPlaceholder />
        <ArtifactCard.ShimmerPlaceholder />
        <ArtifactCard.ShimmerPlaceholder />
      </div>

      <div className="absolute left-1/2 top-1/2 -translate-1/2">
        <FailedState.WallCentered.Retryable
          withCard
          errorPayload={error.message}
          onClickRetry={onClickRetry}
        />
      </div>
    </div>
  );
}

function NotEligible() {
  const t = useDevetekTranslations('page.applicationDetail.artifactsHistory');

  return (
    <CardWrapper>
      <em className="text-primary/50">{t('unsupportedMessage')}</em>
    </CardWrapper>
  );
}

function Empty() {
  const t = useDevetekTranslations('page.applicationDetail.artifactsHistory');

  return (
    <CardWrapper>
      <em className="text-primary/50">{t('emptyMessage')}</em>
    </CardWrapper>
  );
}

export const ArtifactsHistoryStates = {
  Loading,
  Failed,
  NotEligible,
  Empty,
};
