import { lazy } from 'react';

import { registerModal } from '@/services/modal';

const Modal = lazy(() => import('./-view'));

export const useMigrateOwnershipModal = registerModal(Modal);
