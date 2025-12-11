import { lazy } from 'react';

import { registerModal } from '@/services/modal';

const ArtifactLogsModal = lazy(() => import('./view'));

export const useArtifactLogsModal = registerModal(ArtifactLogsModal);
