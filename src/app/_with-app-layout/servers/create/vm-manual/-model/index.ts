import { zodResolver } from '@hookform/resolvers/zod';
import { useForm as useReactHookForm } from 'react-hook-form';

import { buildContext } from '@/shared/libs/react-factories/buildContext';
import useHandler from '@/shared/libs/react-hooks/useHandler';

import { formSchema } from './form';

export const [FormProvider, useForm] = buildContext('Form', () => {
  const form = useReactHookForm({
    resolver: zodResolver(formSchema),
    mode: 'onTouched',
  });

  const handleFormReset = useHandler(() => {
    form.reset({
      cloud: {
        provider: undefined,
        sshKeyID: undefined,
      },
      server: {
        address: '',
        ssh_port: undefined,
        http_port: undefined,
        domain: undefined,
      },
      login: {
        default_user: '',
      },
    });
  });

  return {
    form,
    formErrors: form.formState.errors,
    handleFormReset,
  };
});
