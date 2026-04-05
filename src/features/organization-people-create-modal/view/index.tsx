import { ModalLayoutGeneral } from '@/services/modal/ui/presentation';

import { DcProvider } from '../model';
import type { OrganizationPeopleCreateModalProps as Props } from '../model/types';

import { FindUsers } from './FindUsers';
import { Organization } from './Organization';
import { SubmitButton } from './SubmitButton';

export default function OrganizationPeopleCreateModal(props: Props) {
  return (
    <DcProvider {...props}>
      <ModalLayoutGeneral>
        <ModalLayoutGeneral.Title canClickClose title="Add New People" />

        <ModalLayoutGeneral.Content className="flex flex-col gap-6">
          <Organization organization_id={props.organization_id} />
          <FindUsers />
          <SubmitButton />
        </ModalLayoutGeneral.Content>
      </ModalLayoutGeneral>
    </DcProvider>
  );
}
