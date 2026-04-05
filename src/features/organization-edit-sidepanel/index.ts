import { lazy } from 'react';

import { registerSidepanel } from '@/services/sidepanel';

const OrgEditSidepanel = lazy(() => import('./view'));

export const useOrganizationEditSidepanel = registerSidepanel(OrgEditSidepanel);
