import { ModalLayoutGeneral } from '@/services/modal/ui/presentation';

import { DucProvider } from '../model';
import type { DbUserCreateModalProps as Props } from '../model/types';

import { AdditionalCombos } from './AdditionalCombos';
import { ResourceCombo } from './ResourceCombo';
import { SubmitButton } from './SubmitButton';
import { UserInfo } from './UserInfo';

export default function DbUserGrantModal(props: Props) {
  return (
    <DucProvider {...props}>
      <ModalLayoutGeneral>
        <ModalLayoutGeneral.Title canClickClose title="Create Database User" />

        <ModalLayoutGeneral.Content className="flex flex-col gap-6">
          <UserInfo />
          <ResourceCombo />
          <AdditionalCombos />

          <SubmitButton />
        </ModalLayoutGeneral.Content>
      </ModalLayoutGeneral>
    </DucProvider>
  );
}
