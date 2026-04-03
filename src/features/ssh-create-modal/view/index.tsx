import { KeyRoundIcon } from 'lucide-react';

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
        <ModalLayoutGeneral.Title canClickClose title="Add SSH Key" />

        <ModalLayoutGeneral.Content>
          <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/40 border border-border">
            <KeyRoundIcon className="w-8 h-8 shrink-0 mt-0.5 text-primary/50" />
            <div className="flex flex-col gap-0.5">
              <p className="text-sm font-semibold">What is an SSH Key?</p>
              <p className="text-xs text-primary/60 leading-relaxed">
                An SSH key is a secure credential that lets you log in to your
                virtual machines without a password. Generate a key pair here —
                the private key stays on your device, and dNocs uses the public
                key to verify your identity.
              </p>
            </div>
          </div>

          <section className="mt-5 flex flex-col gap-1.5">
            <DisplayName />
          </section>

          <section className="mt-5 flex flex-col gap-1.5">
            <KeyLength />
          </section>

          <section className="mt-6">
            <SubmitButton />
          </section>
        </ModalLayoutGeneral.Content>
      </ModalLayoutGeneral>
    </SSHCreateProvider>
  );
}
