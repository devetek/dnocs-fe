import { useState } from 'react';

import type { DTOs } from '@/shared/api';
import { ApiUser } from '@/shared/api';
import { ErrorInline } from '@/shared/presentation/atoms/ErrorInline';
import { Spinner } from '@/shared/presentation/atoms/Spinner';
import { ComboboxWithSearch } from '@/shared/presentation/molecules/ComboboxWithSearch';
import type { ComboboxItem } from '@/shared/presentation/molecules/ComboboxWithSearch/ComboboxWithSearch';
import { FailedState } from '@/widgets/failed-state';

import { useDcContext } from '../../model';

export default function FindUsers() {
  const [response] = ApiUser.Find.useGet({ pageSize: 1000 });
  const { form } = useDcContext();
  const [searchUserID, setSearchUserID] = useState<string>('');

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

  const users: ComboboxItem[] =
    response.users?.map((user: DTOs.User) => {
      return {
        label: user.username,
        value: user.id.toString(),
      };
    }) ?? [];

  const handleChange = (selectedUserID: string) => {
    const selectedUser: ComboboxItem[] = users.filter(
      (user: ComboboxItem) => user.value === selectedUserID,
    );

    setSearchUserID(() => {
      const userId = selectedUser.at(0)?.value ?? '0';
      form.setValue('user_id', userId);
      return userId;
    });
  };

  return (
    <section className="flex flex-col gap-1">
      <p className="text-sm font-medium">User</p>
      <ComboboxWithSearch
        {...form.register('user_id')}
        classNameButton="w-full"
        onChange={handleChange}
        items={users}
        value={searchUserID}
      />
      <ErrorInline message={form.formState.errors.user_id?.message} />
    </section>
  );
}
