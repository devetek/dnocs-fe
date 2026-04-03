import { ModalLayoutGeneral } from '@/services/modal/ui/presentation';

import { capitalizeEveryFirstLetter } from '@/shared/libs/browser/string';

import { DcProvider } from '../model';
import type { UserFormModalProps as Props } from '../model/types';

import { Fullname } from './Fullname';
import { Password } from './Password';
import { SubmitButton } from './SubmitButton';
import { Username } from './Username';

export default function UserFormModal(props: Props) {
  const { action, user } = props;

  return (
    <DcProvider {...props}>
      <ModalLayoutGeneral>
        <ModalLayoutGeneral.Title
          canClickClose
          title={`${capitalizeEveryFirstLetter(action)} User`}
        />

        <ModalLayoutGeneral.Content className="flex flex-col gap-4">
          {user.email && (
            <section className="flex flex-col gap-1.5">
              <label className="text-sm font-medium">Email</label>
              <p className="text-sm px-3 py-2 rounded-md border bg-muted text-muted-foreground">
                {user.email}
              </p>
              <p className="text-xs text-muted-foreground">Email cannot be changed.</p>
            </section>
          )}

          <Fullname value={user.fullname} />
          <Username value={user.username} />
          <Password />
          <SubmitButton />
        </ModalLayoutGeneral.Content>
      </ModalLayoutGeneral>
    </DcProvider>
  );
}
