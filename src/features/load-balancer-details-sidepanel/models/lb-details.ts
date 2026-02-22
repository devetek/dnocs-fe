import { AdapterLoadBalancerFromDto } from '@/entities/load-balancer/adapter';
import { AdapterLoggingRichCaddyLbFromJsonStr } from '@/entities/logging-rich/caddy-lb/adapter';

import { ApiRouter, ApiServer } from '@/shared/api';
import { useAdapter } from '@/shared/libs/api-client';
import { excludeFalsy } from '@/shared/libs/browser/typeguards';
import buildSelector from '@/shared/libs/react-factories/buildSelector';

import type { LoadBalancerDetailsSidepanelProps as SidepanelProps } from '../rules/types';

import { useSubscribe } from './events';

export const [LbDetailsModelProvider, useLbDetailsModel] = buildSelector(
  'LbDetailsModel',
)((props: SidepanelProps) => {
  const { loadBalancerId } = props;

  const [responseDetails, refreshDetails] = ApiRouter.Detail.$Id.useGet({
    routerId: loadBalancerId,
  });

  const [responseLog, refreshLog] = ApiServer.Detail.$Id.Log.useGetWhen(() => {
    if (
      responseDetails.$status === 'success' &&
      responseDetails.machine_id &&
      responseDetails.domain
    ) {
      return {
        serverId: String(responseDetails.machine_id),
        file: `/var/log/caddy/${responseDetails.domain}.access.log`,
        line: 30,
      };
    }
  });

  useSubscribe(
    '#load-balancer-details-sidepanel/lb-details/refresh-details',
    () => {
      refreshDetails();
    },
  );

  useSubscribe(
    '#load-balancer-details-sidepanel/lb-details/refresh-activity-timeline',
    () => {
      refreshLog();
    },
  );

  return {
    ...props,
    details: useAdapter(responseDetails, (raw) =>
      AdapterLoadBalancerFromDto.toLoadBalancerDetails(raw).unwrap(),
    ),
    activityTimeline: useAdapter(responseLog, (raw) => {
      return raw
        .filter(excludeFalsy)
        .toReversed()
        .map((log) =>
          AdapterLoggingRichCaddyLbFromJsonStr.toLoggingRichCaddyLb(
            log,
          ).unwrap(),
        );
    }),
  };
});
