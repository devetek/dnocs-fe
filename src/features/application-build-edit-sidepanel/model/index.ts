import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { buildContext } from '@/shared/libs/react-factories/buildContext';

import { schemaApplicationBuildEdit } from '../rules/form-schema';
import type { ApplicationBuildEditSidepanelProps } from '../rules/types';

export const [ApplicationBuildEditModelProvider, useApplicationBuildEditModel] =
  buildContext(
    'ApplicationBuildEditModel',
    (props: ApplicationBuildEditSidepanelProps) => {
      const { onSuccess = () => {} } = props;

      const form = useForm({
        resolver: zodResolver(schemaApplicationBuildEdit),
        defaultValues: {
          steps: props.steps.map((step) => ({
            name: step.name,
            commandText: (step.command ?? []).join('\n'),
            archive: step.archive,
          })),
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
