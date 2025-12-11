import { ErrorInline } from '@/shared/presentation/atoms/ErrorInline';
import { Input } from '@/shared/presentation/atoms/Input';

import { useDcContext } from '../../model';

export default function Name() {
  const { form } = useDcContext();

  return (
    <section className="flex flex-col gap-1">
      <p className="text-sm font-medium">Price Name</p>

      <Input placeholder="Price Name" {...form.register('name')} />

      <ErrorInline message={form.formState.errors.name?.message} />
    </section>
  );
}
