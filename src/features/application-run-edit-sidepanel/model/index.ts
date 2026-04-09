import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { buildContext } from '@/shared/libs/react-factories/buildContext';

import { schemaApplicationRunEdit } from '../rules/form-schema';
import type { ApplicationRunEditSidepanelProps } from '../rules/types';

export const [ApplicationRunEditModelProvider, useApplicationRunEditModel] =
  buildContext(
    'ApplicationRunEditModel',
    (props: ApplicationRunEditSidepanelProps) => {
      const { onSuccess = () => {} } = props;

      const form = useForm({
        resolver: zodResolver(schemaApplicationRunEdit),
        defaultValues: {
          command: props.command,
          envs: props.envs,
        },
      });

      return {
        props,
        form,
        onSuccess,
        isSubmitting: form.formState.isSubmitting,
        hasChanges: form.formState.isDirty,
      };
    },
  );
