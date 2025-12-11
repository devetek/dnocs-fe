import { lazy } from 'react';

import { registerModal } from '@/services/modal';

const LogBrowserModal = lazy(() => import('./view'));

export const useLogBrowserModal = registerModal(LogBrowserModal);
