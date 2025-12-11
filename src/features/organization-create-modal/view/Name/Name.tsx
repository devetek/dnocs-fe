import { useAuthLoggedIn } from '@/services/auth';

import { ErrorInline } from '@/shared/presentation/atoms/ErrorInline';
import { Input } from '@/shared/presentation/atoms/Input';

import { useDcContext } from '../../model';

export default function Name() {
  const userId = useAuthLoggedIn().userProfile.id;
  const { form } = useDcContext();

  return (
    <section className="flex flex-col gap-1">
      <p className="text-sm font-medium">Display Name</p>

      <Input type="hidden" {...form.register('user_id')} value={userId} />
      <Input placeholder="Team Name" {...form.register('name')} />

      <ErrorInline message={form.formState.errors.name?.message} />
    </section>
  );
}
