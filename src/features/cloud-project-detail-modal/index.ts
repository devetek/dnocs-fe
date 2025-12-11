import { lazy } from 'react';

import { registerModal } from '@/services/modal';

const Lazy = lazy(() => import('./view'));

export const useCloudProjectDetailModal = registerModal(Lazy);
