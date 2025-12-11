import { ModalLayoutGeneral } from '@/services/modal/ui/presentation';

import { MachineList } from './MachineList';
import type { SelectMachineModalProps as Props } from './types';

export default function SelectMachineModal(props: Props) {
  return (
    <ModalLayoutGeneral>
      <ModalLayoutGeneral.Title canClickClose title="Select Machine" />

      <ModalLayoutGeneral.Content className="flex flex-col gap-2">
        <MachineList {...props} />
      </ModalLayoutGeneral.Content>
    </ModalLayoutGeneral>
  );
}
