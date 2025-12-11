import { lazy } from 'react';

import { registerModal } from '@/services/modal';

const DbUserCreateModal = lazy(() => import('./view'));

export const useDbUserCreateModal = registerModal(DbUserCreateModal);
