import { ModalLayoutGeneral } from '@/services/modal/ui/presentation';

import { DcProvider } from '../model';
import type { OrganizationCreateModalProps as Props } from '../model/types';

import { Name } from './Name';
import { SubmitButton } from './SubmitButton';

export default function DbUserGrantModal(props: Props) {
  return (
    <DcProvider {...props}>
      <ModalLayoutGeneral>
        <ModalLayoutGeneral.Title canClickClose title="Create a Team" />

        <ModalLayoutGeneral.Content className="flex flex-col gap-6">
          <Name />
          <SubmitButton />
        </ModalLayoutGeneral.Content>
      </ModalLayoutGeneral>
    </DcProvider>
  );
}
