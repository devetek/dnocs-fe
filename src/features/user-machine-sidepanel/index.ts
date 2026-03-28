import { lazy } from 'react';

import { registerSidepanel } from '@/services/sidepanel';

const UserMachineSidepanel = lazy(() => import('./view'));

export const useUserMachineSidepanel = registerSidepanel(UserMachineSidepanel);
