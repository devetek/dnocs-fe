import { lazy } from 'react';

import { registerModal } from '@/services/modal';

const UserFormModal = lazy(() => import('./view'));

export const useUserFormModal = registerModal(UserFormModal);
