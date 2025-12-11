import { ErrorInline } from '@/shared/presentation/atoms/ErrorInline';
import { Input } from '@/shared/presentation/atoms/Input';

import { useDcContext } from '../../model';

export default function Limit() {
  const { form } = useDcContext();

  return (
    <section className="flex flex-col gap-1">
      <p className="text-sm font-medium">Limit</p>

      <Input
        type="number"
        placeholder="Set limit"
        {...form.register('limit')}
      />

      <ErrorInline message={form.formState.errors.limit?.message} />
    </section>
  );
}
