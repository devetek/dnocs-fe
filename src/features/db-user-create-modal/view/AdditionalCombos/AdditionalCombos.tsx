import { useController } from 'react-hook-form';

import { Combobox } from '@/shared/presentation/molecules/Combobox';

import { ALLOW_FROM, ENGINE_LIST } from '../../config';
import { useDucContext } from '../../model';
import { ErrorInline } from '../../presentation/ErrorInline';

export default function AdditionalCombos() {
  const { form } = useDucContext();

  const ctrlAllowFrom = useController({
    control: form.control,
    name: 'connection',
  });

  const ctrlEngine = useController({
    control: form.control,
    name: 'engine',
  });

  return (
    <>
      <section className="flex flex-col">
        <p className="text-sm font-medium">Allow From</p>

        <Combobox
          classNameButton="w-full"
          placeholder="Select allow from"
          items={ALLOW_FROM}
          value={ctrlAllowFrom.field.value}
          onChange={ctrlAllowFrom.field.onChange}
        />

        <ErrorInline message={form.formState.errors.connection?.message} />
      </section>

      <section className="flex flex-col">
        <p className="text-sm font-medium">Engine</p>

        <Combobox
          classNameButton="w-full"
          placeholder="Select engine"
          items={ENGINE_LIST}
          value={ctrlEngine.field.value}
          onChange={ctrlEngine.field.onChange}
        />

        <ErrorInline message={form.formState.errors.engine?.message} />
      </section>
    </>
  );
}
