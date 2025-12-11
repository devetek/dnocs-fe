import { lazy } from 'react';

import { registerSidepanel } from '@/services/sidepanel';

const ArtifactNewSidepanel = lazy(() => import('./view'));

export const useArtifactNewSidepanel = registerSidepanel(ArtifactNewSidepanel);
