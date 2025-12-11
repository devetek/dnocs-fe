import { lazy } from 'react';

import { registerSidepanel } from '@/services/sidepanel';

const FileManagerSidepanel = lazy(() => import('./view'));

export const useFileManagerSidepanel = registerSidepanel(FileManagerSidepanel);
