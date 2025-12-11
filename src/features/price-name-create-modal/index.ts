import { lazy } from 'react';

import { registerModal } from '@/services/modal';

const PriceNameCreateModal = lazy(() => import('./view'));

export const usePriceNameCreateModal = registerModal(PriceNameCreateModal);
