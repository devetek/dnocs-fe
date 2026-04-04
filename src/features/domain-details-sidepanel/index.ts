import { lazy } from 'react';

import { registerSidepanel } from '@/services/sidepanel';

const DomainDetailsSidepanel = lazy(() => import('./view'));

export const useDomainDetailsSidepanel = registerSidepanel(
  DomainDetailsSidepanel,
);
