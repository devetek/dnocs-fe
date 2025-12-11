import { ModalLayoutGeneral } from '@/services/modal/ui/presentation';

import { DcProvider } from '../model';
import type { PricePackageConsumerCreateModalProps as Props } from '../model/types';

import { FindOrganizations } from './FindOrganizations';
import { FindPackages } from './FindPackages';
import { FindUsers } from './FindUsers';
import { SubmitButton } from './SubmitButton';

export default function PricePackageConsumerCreateModal(props: Props) {
  return (
    <DcProvider {...props}>
      <ModalLayoutGeneral>
        <ModalLayoutGeneral.Title canClickClose title="Create Payment" />
        <ModalLayoutGeneral.Content className="flex flex-col gap-6">
          <FindUsers />
          <FindOrganizations />
          <FindPackages />
          <SubmitButton />
        </ModalLayoutGeneral.Content>
      </ModalLayoutGeneral>
    </DcProvider>
  );
}
