import { lazy } from 'react';

import { registerSidepanel } from '@/services/sidepanel';

const Sidepanel = lazy(() => import('./view'));

export const useSignUpSidepanel = registerSidepanel(Sidepanel);
