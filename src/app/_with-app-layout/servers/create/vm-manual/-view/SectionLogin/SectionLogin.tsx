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
      sectionDescription="Enter the username you'll use to access your virtual machine."
    >
      <h6 className="text-sm font-bold">Username</h6>
      <Input
        className="w-full"
        placeholder="Enter your username"
        {...form.register('login.default_user')}
      />
      <ErrorInline message={formErrors.login?.default_user?.message} />
    </Sectioned>
  );
}
