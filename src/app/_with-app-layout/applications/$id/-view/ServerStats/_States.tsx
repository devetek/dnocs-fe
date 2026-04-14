import { useDevetekTranslations } from '@/services/i18n';

import { Spinner } from '@/shared/presentation/atoms/Spinner';
import { FailedState } from '@/widgets/failed-state';

import { useAppDataModel } from '../../-model/app-data';
import { useEmit } from '../../-model/events';

import { ServerStatsLayout as Layout } from './_presentation';

function Unavailable() {
  const t = useDevetekTranslations();

  return (
    <Layout.Frame>
      <p className="text-sm italic text-primary/50">
        {t('page.applicationDetail.usageStats.unavailablePlaceholder')}
      </p>
    </Layout.Frame>
  );
}

function Loading() {
  return (
    <Layout.Frame>
      <div className="h-25 flex items-center justify-center">
        <Spinner />
      </div>
    </Layout.Frame>
  );
}

function Failed() {
  const emit = useEmit();

  const handleClickRetry = () => {
    emit('@applications::detail/server-usage-retry-all', null);
  };

  return (
    <Layout.Frame>
      <FailedState.BannerRetryable onClickRetry={handleClickRetry} />
    </Layout.Frame>
  );
}

function Initial() {
  const [appDetailStatus, selectedServerId] = useAppDataModel((s) => [
    s.appDetail.$status,
    s.selectedServerId,
  ]);

  if (appDetailStatus === 'success' && !selectedServerId) {
    return <Unavailable />;
  }

  return <Loading />;
}

export const ServerStatsStates = {
  Initial,
  Loading,
  Failed,
  Unavailable,
};
