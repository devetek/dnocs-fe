import { lazy } from 'react';

import { registerSidepanel } from '@/services/sidepanel';

const ApplicationEditSidepanel = lazy(() => import('./view'));

export const useApplicationEditSidepanel = registerSidepanel(
  ApplicationEditSidepanel,
);
