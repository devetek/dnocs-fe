import { lazy } from 'react';

import { registerSidepanel } from '@/services/sidepanel';

const ServerServicesSidepanel = lazy(() => import('./view'));

export const useServerServicesSidepanel = registerSidepanel(ServerServicesSidepanel);
