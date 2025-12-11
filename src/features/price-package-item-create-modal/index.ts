import { lazy } from 'react';

import { registerModal } from '@/services/modal';

const PricePackageItemCreateModal = lazy(() => import('./view'));

export const usePricePackageItemCreateModal = registerModal(
  PricePackageItemCreateModal,
);
