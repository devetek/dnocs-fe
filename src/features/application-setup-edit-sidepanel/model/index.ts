import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { buildContext } from '@/shared/libs/react-factories/buildContext';

import { schemaApplicationSetupEdit } from '../rules/form-schema';
import type { ApplicationSetupEditSidepanelProps } from '../rules/types';

export const [ApplicationSetupEditModelProvider, useApplicationSetupEditModel] =
  buildContext(
    'ApplicationSetupEditModel',
    (props: ApplicationSetupEditSidepanelProps) => {
      const { onSuccess = () => {} } = props;

      const form = useForm({
        resolver: zodResolver(schemaApplicationSetupEdit),
        defaultValues: {
          language: props.language,
          languages: props.languages,
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
