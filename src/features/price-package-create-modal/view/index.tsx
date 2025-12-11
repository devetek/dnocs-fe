import { ModalLayoutGeneral } from '@/services/modal/ui/presentation';

import { DcProvider } from '../model';
import type { PricePackageCreateModalProps as Props } from '../model/types';

import { Access } from './Access';
import { Currency } from './Currency';
import { Name } from './Name';
import { Period } from './Period';
import { Price } from './Price';
import { SubmitButton } from './SubmitButton';

export default function DbUserGrantModal(props: Props) {
  return (
    <DcProvider {...props}>
      <ModalLayoutGeneral>
        <ModalLayoutGeneral.Title canClickClose title="Create Package" />

        <ModalLayoutGeneral.Content className="flex flex-col gap-6">
          <Name />
          <Period />
          <Currency />
          <Price />
          <Access />
          <SubmitButton />
        </ModalLayoutGeneral.Content>
      </ModalLayoutGeneral>
    </DcProvider>
  );
}
