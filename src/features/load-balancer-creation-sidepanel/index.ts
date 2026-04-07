import { lazy } from 'react';

import { registerSidepanel } from '@/services/sidepanel';

export * as LoadBalancerCreationRules from './-rules';

const LoadBalancerCreationSidepanel = lazy(() => import('./-view'));

export const useLoadBalancerCreationSidepanel = registerSidepanel(
  LoadBalancerCreationSidepanel,
);
