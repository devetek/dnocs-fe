import { lazy } from 'react';

import { registerSidepanel } from '@/services/sidepanel';

export * as DomainRegistrationRules from './-rules';

const DomainRegistrationSidepanel = lazy(() => import('./-view'));

export const useDomainRegistrationSidepanel = registerSidepanel(
  DomainRegistrationSidepanel,
);
