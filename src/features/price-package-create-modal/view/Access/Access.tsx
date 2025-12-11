import { useController } from 'react-hook-form';

import { ErrorInline } from '@/shared/presentation/atoms/ErrorInline';
import { Combobox } from '@/shared/presentation/molecules/Combobox';

import { useDcContext } from '../../model';

export const CURRENCY_LIST = [
  {
    label: <span className="flex items-center gap-2">Public</span>,
    value: true,
  },
  {
    label: <span className="flex items-center gap-2">Private</span>,
    value: false,
  },
];

export default function EngineCombo() {
  const { form } = useDcContext();
  const ctrl = useController({
    control: form.control,
    name: 'is_public',
  });

  return (
    <section className="flex flex-col gap-1">
      <p className="text-sm font-medium">Access</p>

      <Combobox
        classNameButton="w-full"
        items={CURRENCY_LIST}
        placeholder="Select Access"
        value={ctrl.field.value}
        onChange={ctrl.field.onChange}
      />

      <ErrorInline message={ctrl.fieldState.error?.message} />
    </section>
  );
}
