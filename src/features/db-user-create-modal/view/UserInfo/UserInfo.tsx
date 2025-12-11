import { Input } from '@/shared/presentation/atoms/Input';

import { useDucContext } from '../../model';
import { ErrorInline } from '../../presentation/ErrorInline';

export default function UserInfo() {
  const { form } = useDucContext();

  return (
    <>
      <section className="flex flex-col">
        <p className="text-sm font-medium">Username</p>

        <Input placeholder="Username" {...form.register('userInfo.username')} />

        <ErrorInline
          message={form.formState.errors.userInfo?.username?.message}
        />
      </section>

      <section className="flex flex-col">
        <p className="text-sm font-medium">Password</p>

        <Input
          type="password"
          placeholder="Password"
          {...form.register('userInfo.password')}
        />

        <ErrorInline
          message={form.formState.errors.userInfo?.password?.message}
        />
      </section>
    </>
  );
}
