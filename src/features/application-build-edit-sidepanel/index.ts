import { lazy } from 'react';

import { registerSidepanel } from '@/services/sidepanel';

const ApplicationBuildEditSidepanel = lazy(() => import('./view'));

export const useApplicationBuildEditSidepanel = registerSidepanel(
  ApplicationBuildEditSidepanel,
);
