import { useState } from 'react';

import type { DTOs } from '@/shared/api';
import { ApiOrganization } from '@/shared/api';
import { ErrorInline } from '@/shared/presentation/atoms/ErrorInline';
import { Spinner } from '@/shared/presentation/atoms/Spinner';
import { ComboboxWithSearch } from '@/shared/presentation/molecules/ComboboxWithSearch';
import type { ComboboxItem } from '@/shared/presentation/molecules/ComboboxWithSearch/ComboboxWithSearch';
import { FailedState } from '@/widgets/failed-state';

import { useDcContext } from '../../model';

export default function FindOrganizations() {
  const [response] = ApiOrganization.Find.useGet({ pageSize: 1000 });
  const { form } = useDcContext();
  const [searchOrganizationID, setSearchOrganizationID] = useState<string>('');

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

  const organizations: ComboboxItem[] =
    response.organizations?.map((org: DTOs.OrganizationV1) => {
      return {
        label: org.name,
        value: org.id?.toString() ?? '',
      };
    }) ?? [];

  const handleChange = (selectedOrganizationID: string) => {
    const selected: ComboboxItem[] = organizations.filter(
      (item: ComboboxItem) => item.value === selectedOrganizationID,
    );

    setSearchOrganizationID(() => {
      const organizationId = selected.at(0)?.value ?? '0';
      form.setValue('organization_id', organizationId);
      return organizationId;
    });
  };

  return (
    <section className="flex flex-col gap-1">
      <p className="text-sm font-medium">Team</p>
      <ComboboxWithSearch
        {...form.register('organization_id')}
        classNameButton="w-full"
        onChange={handleChange}
        items={organizations}
        value={searchOrganizationID}
      />
      <ErrorInline message={form.formState.errors.organization_id?.message} />
    </section>
  );
}
