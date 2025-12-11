import { ErrorInline } from '@/shared/presentation/atoms/ErrorInline';
import { Input } from '@/shared/presentation/atoms/Input';

import { useDcContext } from '../../model';

export default function Period() {
  const { form } = useDcContext();

  return (
    <section className="flex flex-col gap-1">
      <p className="text-sm font-medium">Package Price</p>

      <Input
        type="number"
        placeholder="Package price"
        {...form.register('price')}
      />

      <ErrorInline message={form.formState.errors.price?.message} />
    </section>
  );
}
