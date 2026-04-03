import { lazy } from 'react';

import { registerSidepanel } from '@/services/sidepanel';

const ServerNetworksSidepanel = lazy(() => import('./view'));

export const useServerNetworksSidepanel = registerSidepanel(ServerNetworksSidepanel);
