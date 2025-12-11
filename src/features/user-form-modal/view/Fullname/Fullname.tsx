import { ErrorInline } from '@/shared/presentation/atoms/ErrorInline';
import { Input } from '@/shared/presentation/atoms/Input';

import { useDcContext } from '../../model';

export interface FullnameProps {
  value: string;
}

export default function Fullname(props: FullnameProps) {
  const { form } = useDcContext();

  return (
    <section className="flex flex-col gap-1">
      <p className="text-sm font-medium">Fullname</p>
      <Input
        placeholder="Fullname"
        {...form.register('fullname')}
        defaultValue={props.value}
      />

      <ErrorInline message={form.formState.errors.fullname?.message} />
    </section>
  );
}
