import { useState } from 'react';

import { EyeIcon, EyeOffIcon, UserRoundIcon } from 'lucide-react';

import { Input } from '@/shared/presentation/atoms/Input';

import { useForm } from '../../-model';
import { ErrorInline } from '../../-presentation/ErrorInline';
import { Sectioned } from '../../../-presentation/Sectioned';

export default function SectionLogin() {
  const { form, formErrors } = useForm();
  const [showPassword, setShowPassword] = useState(false);

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
      <div className="relative">
        <Input
          className="w-full pr-10"
          type={showPassword ? 'text' : 'password'}
          placeholder="Enter your password"
          {...form.register('login.password')}
        />
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute inset-y-0 right-3 flex items-center text-muted-foreground hover:text-foreground transition-colors"
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          {showPassword ? (
            <EyeOffIcon className="w-4 h-4" />
          ) : (
            <EyeIcon className="w-4 h-4" />
          )}
        </button>
      </div>
      <ErrorInline message={formErrors.login?.password?.message} />
    </Sectioned>
  );
}
