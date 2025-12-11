import { ModalLayoutGeneral } from '@/services/modal/ui/presentation';

import { DugProvider } from '../model';
import type { DbUserGrantModalProps as Props } from '../model/types';

import { AccessChecklistGrid } from './AccessChecklistGrid';
import { AdditionalChecklist } from './AdditionalChecklist';
import { DatabaseCombo } from './DatabaseCombo';
import { SubmitButton } from './SubmitButton';

export default function DbUserGrantModal(props: Props) {
  const { selectedUserId, selectedUserName } = props;

  return (
    <DugProvider {...props}>
      <ModalLayoutGeneral>
        <ModalLayoutGeneral.Title
          canClickClose
          title="Grant Permission"
          description={
            <>
              For user <code>{selectedUserName}</code>{' '}
              <code>({selectedUserId})</code>
            </>
          }
        />

        <ModalLayoutGeneral.Content>
          <section className="flex flex-col gap-1">
            <DatabaseCombo />
          </section>

          <section className="mt-6 flex flex-col gap-1">
            <AccessChecklistGrid />
          </section>

          <section className="mt-6 flex flex-col gap-1">
            <AdditionalChecklist />
          </section>

          <section className="mt-6 flex flex-col gap-1">
            <SubmitButton />
          </section>
        </ModalLayoutGeneral.Content>
      </ModalLayoutGeneral>
    </DugProvider>
  );
}
