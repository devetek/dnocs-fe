import { lazy } from 'react';

import { registerModal } from '@/services/modal';

const SelectMachineModal = lazy(() => import('./view'));

export const useSelectMachineModal = registerModal(SelectMachineModal);
