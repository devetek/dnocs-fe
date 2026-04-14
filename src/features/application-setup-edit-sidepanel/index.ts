import { lazy } from 'react';

import { registerSidepanel } from '@/services/sidepanel';

const ApplicationSetupEditSidepanel = lazy(() => import('./view'));

export const useApplicationSetupEditSidepanel = registerSidepanel(
  ApplicationSetupEditSidepanel,
);
