import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { buildContext } from '@/shared/libs/react-factories/buildContext';

import { schemaApplicationEdit } from '../rules/form-schema';
import type { ApplicationEditSidepanelProps } from '../rules/types';

export const [ApplicationEditModelProvider, useApplicationEditModel] =
  buildContext(
    'ApplicationEditModel',
    (props: ApplicationEditSidepanelProps) => {
      const { onSuccess = () => {} } = props;

      const form = useForm({
        resolver: zodResolver(schemaApplicationEdit),
        defaultValues: {
          autoDeploy: {
            fromBranch: props.autoDeploy.fromBranch || '',
            isEnabled: !!props.autoDeploy.isEnabled,
          },
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
