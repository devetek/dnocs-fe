import { lazy } from 'react';

import { registerModal } from '@/services/modal';

const ArtifactRollbackModal = lazy(() => import('./view'));

export const useArtifactRollbackModal = registerModal(ArtifactRollbackModal);
