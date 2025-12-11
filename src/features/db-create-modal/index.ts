import { lazy } from 'react';

import { registerModal } from '@/services/modal';

const DbCreateModal = lazy(() => import('./view'));

export const useDbCreateModal = registerModal(DbCreateModal);
