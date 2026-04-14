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
        projectID: undefined,
        sshKeyID: undefined,
      },
      login: {
        username: '',
        password: '',
      },
      regionSlug: undefined,
      spec: {
        osTemplate: undefined,
        cpuCore: undefined,
        diskSizeGB: undefined,
        ramSizeGB: undefined,
      },
      vpcBulk: undefined,
    });
  });

  return {
    form,
    formErrors: form.formState.errors,
    handleFormReset,
  };
});
