import { useController } from 'react-hook-form';

import { useAuthLoggedIn } from '@/services/auth';

import { ApiServer } from '@/shared/api';
import { excludeNully } from '@/shared/libs/browser/typeguards';
import { Combobox } from '@/shared/presentation/molecules/Combobox';
import type { ComboboxItem } from '@/shared/presentation/molecules/Combobox/Combobox';

import { useDucContext } from '../../model';
import { ErrorInline } from '../../presentation/ErrorInline';

export default function ResourceCombo() {
  const userId = useAuthLoggedIn().userProfile.id;

  const { form } = useDucContext();

  const [response] = ApiServer.Find.useGet({
    userId,
    filter: 'shared-with-me',
    pageSize: 100,
  });

  const ctrl = useController({
    control: form.control,
    name: 'resourceID',
  });

  let items: Array<ComboboxItem<number>> = [];

  if (response.$status === 'success' && response.machines) {
    items = response.machines
      .map((machine) => {
        if (!machine.id || !machine.hostname || !machine.address) return null;

        return {
          value: machine.id,
          label: machine.hostname,
          description: <span className="opacity-50">({machine.address})</span>,
        };
      })
      .filter(excludeNully);
  }

  return (
    <section className="flex flex-col">
      <p className="text-sm font-medium">Resource</p>

      <Combobox
        classNameButton="w-full"
        placeholder="Select resource"
        items={items}
        value={ctrl.field.value}
        onChange={ctrl.field.onChange}
      />

      <ErrorInline message={form.formState.errors.resourceID?.message} />
    </section>
  );
}
