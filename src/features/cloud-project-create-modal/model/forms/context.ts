import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { buildContext } from '@/shared/libs/react-factories/buildContext';

import { schemaBaseForm, schemaGcpForm, schemaIDCloudHostForm, schemaProxmoxForm } from './schema';

export const [CpcFormContext, useCpcFormContext] = buildContext(
  'CloudProjectCreationForm',
  () => {
    const formBase = useForm({
      resolver: zodResolver(schemaBaseForm),
    });

    const formIDCloudHost = useForm({
      resolver: zodResolver(schemaIDCloudHostForm),
    });

    const formGCP = useForm({
      resolver: zodResolver(schemaGcpForm),
    });

    const formProxmox = useForm({
      resolver: zodResolver(schemaProxmoxForm),
    });

    return {
      formBase,
      formIDCloudHost,
      formGCP,
      formProxmox,
    };
  },
);
