import { ErrorInline } from '@/shared/presentation/atoms/ErrorInline';
import { Input } from '@/shared/presentation/atoms/Input';

import { useDcContext } from '../../model';

export interface UsernameProps {
  value: string;
}

export default function Username(props: UsernameProps) {
  const { form } = useDcContext();

  return (
    <section className="flex flex-col gap-1">
      <p className="text-sm font-medium">Username</p>
      <Input
        placeholder="Username"
        {...form.register('username')}
        defaultValue={props.value}
        disabled
      />

      <ErrorInline message={form.formState.errors.username?.message} />
    </section>
  );
}
