import { lazy } from 'react';

import { registerModal } from '@/services/modal';

const ItemStatusLogModal = lazy(() => import('./view'));

export const useItemStatusLogModal = registerModal(ItemStatusLogModal);
