import { zodResolver } from '@hookform/resolvers/zod';
import { createFormControl, useForm } from 'react-hook-form';

import { schemaCreationForm } from '../-rules/schemas/form';

export const lbCreationFormProps = createFormControl({
  resolver: zodResolver(schemaCreationForm),
  defaultValues: {
    description: '',
    domain: '',
    serverId: '',
    lbKind: 'l7' as const,
    features: {
      sslEnabled: true,
      protocol: 'http' as const,
    },
    l7rules: [
      {
        pathMatch: '/*',
        type: 'proxy-pass' as const,
        upstreamsIfProxyPass: [{ address: 'localhost', port: 80 }],
        applicationIdIfProxyPassApp: '',
      },
    ],
    l4rule: {
      upstreams: [{ address: '', port: 80 }],
    },
  },
});

export const useLbCreationForm = () =>
  useForm({ formControl: lbCreationFormProps.formControl });
