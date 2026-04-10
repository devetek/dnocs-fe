import { zodResolver } from '@hookform/resolvers/zod';

import { buildRHF } from '@/shared/libs/react-factories/buildRHF';

import { schemaCreationForm } from '../-rules/schemas/form';

export const [FormProvider, useLbCreationForm] = buildRHF({
  resolver: zodResolver(schemaCreationForm),
  defaultValues: {
    description: '',
    domain: '',
    internalDomainMetadata: {
      id: '',
      subdomain: '',
    },
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
  },
});
