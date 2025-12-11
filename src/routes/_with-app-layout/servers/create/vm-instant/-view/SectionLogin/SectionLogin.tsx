import { UserRoundIcon } from 'lucide-react';

import { Input } from '@/shared/presentation/atoms/Input';

import { useForm } from '../../-model';
import { ErrorInline } from '../../-presentation/ErrorInline';
import { Sectioned } from '../../../-presentation/Sectioned';

export default function SectionLogin() {
  const { form, formErrors } = useForm();

  return (
    <Sectioned
      withinCard
      sectionIcon={UserRoundIcon}
      sectionTitle="Login Information"
      sectionDescription="Enter the username and password you'll use to access your virtual machine."
    >
      <h6 className="text-sm font-bold">Username</h6>
      <Input
        className="w-full"
        placeholder="Enter your username"
        {...form.register('login.username')}
      />
      <ErrorInline message={formErrors.login?.username?.message} />

      <h6 className="mt-4 text-sm font-bold">Password</h6>
      <Input
        className="w-full"
        type="password"
        placeholder="Enter your password"
        {...form.register('login.password')}
      />
      <ErrorInline message={formErrors.login?.password?.message} />
    </Sectioned>
  );
}
