import { lazy } from 'react';

import { registerModal } from '@/services/modal';

const SSHKeyCreateModal = lazy(() => import('./view'));

export const useSSHKeyCreateModal = registerModal(SSHKeyCreateModal);
