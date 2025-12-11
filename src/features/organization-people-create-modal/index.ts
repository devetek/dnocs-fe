import { lazy } from 'react';

import { registerModal } from '@/services/modal';

const OrganizationPeopleCreateModal = lazy(() => import('./view'));

export const useOrganizationPeopleCreateModal = registerModal(
  OrganizationPeopleCreateModal,
);
