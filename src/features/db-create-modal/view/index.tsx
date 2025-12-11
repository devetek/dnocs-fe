import { ModalLayoutGeneral } from '@/services/modal/ui/presentation';

import { DcProvider } from '../model';
import type { DbCreateModalProps as Props } from '../model/types';

import { DbName } from './DbName';
import { EngineCombo } from './EngineCombo';
import { ResourceCombo } from './ResourceCombo';
import { SubmitButton } from './SubmitButton';

export default function DbUserGrantModal(props: Props) {
  return (
    <DcProvider {...props}>
      <ModalLayoutGeneral>
        <ModalLayoutGeneral.Title canClickClose title="Create Database" />

        <ModalLayoutGeneral.Content className="flex flex-col gap-6">
          <EngineCombo />
          <DbName />
          <ResourceCombo />

          <SubmitButton />
        </ModalLayoutGeneral.Content>
      </ModalLayoutGeneral>
    </DcProvider>
  );
}
