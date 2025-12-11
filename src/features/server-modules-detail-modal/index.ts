import { lazy } from 'react';

import { registerModal } from '@/services/modal';

const ServerModulesDetailModal = lazy(() => import('./view'));

export const useServerModulesDetailModal = registerModal(
  ServerModulesDetailModal,
);
