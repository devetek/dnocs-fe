import { Card } from '@/shared/presentation/atoms/Card';
import Shimmer from '@/shared/presentation/atoms/Shimmer';
import { FailedState } from '@/widgets/failed-state';

import { useEmit } from '../../-model/events';

import Layout from './_presentation/Layout';

function Loading() {
  return (
    <Layout>
      <Layout.Item>
        <Card className="rounded-2xl px-3 py-2">
          <div className="h-30">
            <Shimmer className="h-4 w-25" />
            <Shimmer className="h-6 my-1 w-18" />
          </div>
        </Card>
      </Layout.Item>

      <Layout.Item>
        <Card className="rounded-2xl px-3 py-2">
          <div className="h-30">
            <Shimmer className="h-4 w-25" />
            <Shimmer className="h-6 my-1 w-26" />
            <Shimmer className="h-5 my-1 w-14" />
          </div>
        </Card>
      </Layout.Item>

      <Layout.Item>
        <Card className="rounded-2xl px-3 py-2">
          <div className="h-30">
            <Shimmer className="h-4 w-25" />
            <Shimmer className="h-6 my-1 w-20" />
            <Shimmer className="h-5 my-1 w-11" />
          </div>
        </Card>
      </Layout.Item>
    </Layout>
  );
}

function Failed() {
  const emit = useEmit();

  return (
    <div className="relative">
      <div className="relative opacity-50">
        <Loading />
      </div>

      <div className="absolute left-1/2 top-1/2 -translate-1/2">
        <FailedState.BannerRetryable
          classNameWrapper="shadow-lg"
          onClickRetry={() => {
            emit('@servers::detail/server-stats-refresh', null);
          }}
        />
      </div>
    </div>
  );
}

export const AsideStatisticsStates = {
  Loading,
  Failed,
};
