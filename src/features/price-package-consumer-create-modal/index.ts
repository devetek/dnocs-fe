import { lazy } from 'react';

import { registerModal } from '@/services/modal';

const PricePackageConsumerCreateModal = lazy(() => import('./view'));

export const usePricePackageConsumerCreateModal = registerModal(
  PricePackageConsumerCreateModal,
);
