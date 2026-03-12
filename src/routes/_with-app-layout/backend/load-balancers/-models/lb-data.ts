import { AdapterLoadBalancerFromDto } from '@/entities/load-balancer/adapter';
import { POLL_INTERVAL_MS__LIST } from '@/entities/load-balancer/config';

import { ApiRouter } from '@/shared/api';
import { useAdapter } from '@/shared/libs/api-client';
import buildSelector from '@/shared/libs/react-factories/buildSelector';

import { useSubscribe } from './events';
import { useFilterModel } from './filters';

export const [LbDataModelProvider, useLbDataModel] = buildSelector(
  'LbDataModel',
)(() => {
  const { currentPage, searchQuery } = useFilterModel();

  const [response, refresh] = ApiRouter.Find.useGet({
    page: currentPage,
    pageSize: 8,
    searchQuery,
    forceMine: localStorage.getItem('organization_id') == null,
    options: {
      refreshIntervalMs: POLL_INTERVAL_MS__LIST,
    },
  });

  useSubscribe('@load-balancers/data--refresh', () => {
    refresh();
  });

  return {
    loadBalancers: useAdapter(response, (raw) => {
      const parsed = (raw.routers || []).map((loadBalancer) =>
        AdapterLoadBalancerFromDto.toLoadBalancerCard(loadBalancer).unwrap(),
      );

      return {
        list: parsed,
        pagination: raw.pagination,
      };
    }),
  };
});
