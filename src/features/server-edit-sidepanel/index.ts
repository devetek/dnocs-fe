import { lazy } from 'react';

import { registerSidepanel } from '@/services/sidepanel';

const ServerEditSidepanel = lazy(() => import('./view'));

export const useServerEditSidepanel = registerSidepanel(ServerEditSidepanel);
