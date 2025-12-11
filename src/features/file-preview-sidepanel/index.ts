import { lazy } from 'react';

import { registerSidepanel } from '@/services/sidepanel';

const FilePreviewSidepanel = lazy(() => import('./view'));

export const useFilePreviewSidepanel = registerSidepanel(FilePreviewSidepanel);
