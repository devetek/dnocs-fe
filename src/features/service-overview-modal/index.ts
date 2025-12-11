import { lazy } from 'react';

import { registerModal } from '@/services/modal';

const ServiceOverviewModal = lazy(() => import('./view'));

export const useServiceOverviewModal = registerModal(ServiceOverviewModal);
