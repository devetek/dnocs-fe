import { ErrorInline } from '@/shared/presentation/atoms/ErrorInline';
import { Input } from '@/shared/presentation/atoms/Input';

import { useDcContext } from '../../model';

export interface FullnameProps {
  value: string;
}

export default function Fullname(props: FullnameProps) {
  const { form } = useDcContext();

  return (
    <section className="flex flex-col gap-1.5">
      <label htmlFor="fullname" className="text-sm font-medium">
        Full Name
      </label>
      <Input
        id="fullname"
        placeholder="Enter your full name"
        {...form.register('fullname')}
        defaultValue={props.value}
      />
      <ErrorInline message={form.formState.errors.fullname?.message} />
    </section>
  );
}
