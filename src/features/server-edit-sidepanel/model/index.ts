import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { buildContext } from '@/shared/libs/react-factories/buildContext';

import { schemaServerEdit } from '../rules/form-schema';
import type { ServerEditSidepanelProps } from '../rules/types';

export const [ServerEditModelProvider, useServerEditModel] = buildContext(
  'ServerEditModel',
  (props: ServerEditSidepanelProps) => {
    const { serverId, onSuccess = () => {} } = props;

    const form = useForm({
      resolver: zodResolver(schemaServerEdit),
      defaultValues: {
        agent: {
          domain: props.agent.domain,
          httpPort: props.agent.httpPort,
        },
        serverAddress: props.serverAddress,
        ssh: {
          port: props.ssh.port,
          username: props.ssh.username,
        },
      },
    });

    return {
      serverId,
      form,
      onSuccess,
      isSubmitting: form.formState.isSubmitting,
      hasChanges: form.formState.isDirty,
    };
  },
);
