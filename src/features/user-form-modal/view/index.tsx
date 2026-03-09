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

        <ModalLayoutGeneral.Content className="flex flex-col gap-6">
          <Fullname value={user.fullname} />
          <Username value={user.username} />
          <Password value={user.password} />
          <SubmitButton />
        </ModalLayoutGeneral.Content>
      </ModalLayoutGeneral>
    </DcProvider>
  );
}
