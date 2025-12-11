import { ModalLayoutGeneral } from '@/services/modal/ui/presentation';

import { SSHCreateProvider } from '../model';
import type { SSHCreateModalProps as Props } from '../model/types';

import { DisplayName } from './DisplayName';
import { KeyLength } from './KeyLength';
import { SubmitButton } from './SubmitButton';

export default function SSHKeyCreateModal(props: Props) {
  return (
    <SSHCreateProvider {...props}>
      <ModalLayoutGeneral>
        <ModalLayoutGeneral.Title canClickClose title="Create SSH Key" />

        <ModalLayoutGeneral.Content>
          <section className="flex flex-col gap-1">
            <DisplayName />
          </section>

          <section className="mt-6 flex flex-col gap-1">
            <KeyLength />
          </section>

          <section className="mt-6 flex flex-col gap-1">
            <SubmitButton />
          </section>
        </ModalLayoutGeneral.Content>
      </ModalLayoutGeneral>
    </SSHCreateProvider>
  );
}
