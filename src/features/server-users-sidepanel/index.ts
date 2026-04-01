import { lazy } from 'react';

import { registerSidepanel } from '@/services/sidepanel';

const ServerUsersSidepanel = lazy(() => import('./view'));

export const useServerUsersSidepanel = registerSidepanel(ServerUsersSidepanel);
