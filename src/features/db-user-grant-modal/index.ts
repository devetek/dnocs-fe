import { lazy } from 'react';

import { registerModal } from '@/services/modal';

const DbUserGrantModal = lazy(() => import('./view'));

export const useDbUserGrantModal = registerModal(DbUserGrantModal);
