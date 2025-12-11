import { Input } from '@/shared/presentation/atoms/Input';

import { useDcContext } from '../../model';
import { ErrorInline } from '../../presentation/ErrorInline';

export default function DbName() {
  const { form } = useDcContext();

  return (
    <section className="flex flex-col gap-1">
      <p className="text-sm font-medium">Database Name</p>

      <Input placeholder="Database Name" {...form.register('dbName')} />

      <ErrorInline message={form.formState.errors.dbName?.message} />
    </section>
  );
}
