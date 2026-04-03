import { lazy } from 'react';

import { registerSidepanel } from '@/services/sidepanel';

const ServerLogViewerSidepanel = lazy(() => import('./view'));

export const useServerLogViewerSidepanel = registerSidepanel(ServerLogViewerSidepanel);
