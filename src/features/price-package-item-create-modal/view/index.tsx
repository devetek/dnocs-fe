import { ModalLayoutGeneral } from '@/services/modal/ui/presentation';

import { DcProvider } from '../model';
import type { PricePackageItemCreateModalProps as Props } from '../model/types';

import { Limit } from './Limit';
import { PriceNames } from './PriceNames';
import { SubmitButton } from './SubmitButton';

export default function PricePackageItemCreateModal(props: Props) {
  return (
    <DcProvider {...props}>
      <ModalLayoutGeneral>
        <ModalLayoutGeneral.Title canClickClose title="Set Service" />
        <ModalLayoutGeneral.Content className="flex flex-col gap-6">
          <PriceNames />
          <Limit />
          <SubmitButton />
        </ModalLayoutGeneral.Content>
      </ModalLayoutGeneral>
    </DcProvider>
  );
}
