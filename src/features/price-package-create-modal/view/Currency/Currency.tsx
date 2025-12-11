import { useController } from 'react-hook-form';

import { ErrorInline } from '@/shared/presentation/atoms/ErrorInline';
import { Combobox } from '@/shared/presentation/molecules/Combobox';

import { useDcContext } from '../../model';

export const CURRENCY_LIST = [
  {
    label: <span className="flex items-center gap-2">IDR</span>,
    value: 'idr',
  },
];

export default function EngineCombo() {
  const { form } = useDcContext();
  const ctrl = useController({
    control: form.control,
    name: 'currency',
  });

  return (
    <section className="flex flex-col gap-1">
      <p className="text-sm font-medium">Currency</p>

      <Combobox
        classNameButton="w-full"
        items={CURRENCY_LIST}
        placeholder="Select Currency"
        value={ctrl.field.value}
        onChange={ctrl.field.onChange}
      />

      <ErrorInline message={ctrl.fieldState.error?.message} />
    </section>
  );
}
