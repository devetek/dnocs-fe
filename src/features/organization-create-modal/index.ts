import { lazy } from 'react';

import { registerModal } from '@/services/modal';

const OrganizationCreateModal = lazy(() => import('./view'));

export const useOrganizationCreateModal = registerModal(
  OrganizationCreateModal,
);
