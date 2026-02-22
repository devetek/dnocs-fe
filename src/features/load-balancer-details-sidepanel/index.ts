import { lazy } from 'react';

import { registerSidepanel } from '@/services/sidepanel';

const LoadBalancerDetailSidepanel = lazy(() => import('./view'));

export const useLoadBalancerDetailSidepanel = registerSidepanel(
  LoadBalancerDetailSidepanel,
);
