import { ErrorInline } from '@/shared/presentation/atoms/ErrorInline';
import { Input } from '@/shared/presentation/atoms/Input';

import { useDcContext } from '../../model';

export interface UsernameProps {
  value: string;
}

export default function Username(props: UsernameProps) {
  const { form } = useDcContext();

  return (
    <section className="flex flex-col gap-1.5">
      <label htmlFor="username" className="text-sm font-medium">
        Username
      </label>
      <Input
        id="username"
        placeholder="Username"
        {...form.register('username')}
        defaultValue={props.value}
        disabled
        className="opacity-60"
      />
      <p className="text-xs text-muted-foreground">Username cannot be changed.</p>
      <ErrorInline message={form.formState.errors.username?.message} />
    </section>
  );
}
