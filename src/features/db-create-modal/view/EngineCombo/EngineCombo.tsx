import { useController } from 'react-hook-form';

import { Combobox } from '@/shared/presentation/molecules/Combobox';

import { ENGINE_LIST } from '../../config';
import { useDcContext } from '../../model';
import { ErrorInline } from '../../presentation/ErrorInline';

export default function EngineCombo() {
  const { form } = useDcContext();

  const ctrl = useController({
    control: form.control,
    name: 'engine',
  });

  return (
    <section className="flex flex-col gap-1">
      <p className="text-sm font-medium">Engine</p>

      <Combobox
        classNameButton="w-full"
        items={ENGINE_LIST}
        placeholder="Select Engine"
        value={ctrl.field.value}
        onChange={ctrl.field.onChange}
      />

      <ErrorInline message={ctrl.fieldState.error?.message} />
    </section>
  );
}
