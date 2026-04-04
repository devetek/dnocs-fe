import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { buildContext } from '@/shared/libs/react-factories/buildContext';

import { schemaRegistrationForm } from '../-rules/schemas/form';
import type { SidepanelProps } from '../-rules/types';

export const [DomainRegistrationModelProvider, useDomainRegistrationModel] =
  buildContext('DomainRegistrationModel', (props: SidepanelProps) => {
    const form = useForm({
      resolver: zodResolver(schemaRegistrationForm),
      defaultValues: {
        domain: '',
        description: '',
        provider: undefined,
        apiToken: '',
        zoneId: '',
      },
    });

    return {
      props,
      form,
      isSubmitting: form.formState.isSubmitting,
    };
  });
