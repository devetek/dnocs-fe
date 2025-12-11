import { ModalLayoutGeneral } from '@/services/modal/ui/presentation';

import { ApiUser } from '@/shared/api';
import { Spinner } from '@/shared/presentation/atoms/Spinner';
import { FailedState } from '@/widgets/failed-state';

import { DcProvider } from '../model';
import type { OrganizationPeopleCreateModalProps as Props } from '../model/types';

import { FindUsers } from './FindUsers';
import { Organization } from './Organization';
import { SubmitButton } from './SubmitButton';

export default function OrganizationPeopleCreateModal(props: Props) {
  const [response] = ApiUser.Find.useGet({ pageSize: 1000 });

  if (response.$status === 'loading') {
    return <Spinner />;
  }

  if (response.$status === 'failed') {
    return <FailedState.WallCentered errorPayload={response.error.message} />;
  }

  if (response.$status !== 'success') {
    return (
      <div className="w-full flex justify-center">
        <Spinner />
      </div>
    );
  }

  const users = response.users ?? [];

  return (
    <DcProvider {...props}>
      <ModalLayoutGeneral>
        <ModalLayoutGeneral.Title canClickClose title="Add New People" />

        <ModalLayoutGeneral.Content className="flex flex-col gap-6">
          <Organization organization_id={props.organization_id} />
          <FindUsers users={users} />
          <SubmitButton />
        </ModalLayoutGeneral.Content>
      </ModalLayoutGeneral>
    </DcProvider>
  );
}
