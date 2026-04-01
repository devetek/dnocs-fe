import { lazy } from 'react';

import { registerSidepanel } from '@/services/sidepanel';

const ServerUserCreateSidepanel = lazy(() => import('./view'));

export const useServerUserCreateSidepanel = registerSidepanel(
  ServerUserCreateSidepanel,
);
