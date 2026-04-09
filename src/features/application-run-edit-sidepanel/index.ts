import { lazy } from 'react';

import { registerSidepanel } from '@/services/sidepanel';

const ApplicationRunEditSidepanel = lazy(() => import('./view'));

export const useApplicationRunEditSidepanel = registerSidepanel(
  ApplicationRunEditSidepanel,
);
