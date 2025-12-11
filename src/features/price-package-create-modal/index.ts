import { lazy } from 'react';

import { registerModal } from '@/services/modal';

const PricePackageCreateModal = lazy(() => import('./view'));

export const usePricePackageCreateModal = registerModal(
  PricePackageCreateModal,
);
