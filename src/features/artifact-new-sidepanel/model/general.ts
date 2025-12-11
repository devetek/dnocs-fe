import { useEffect } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { buildContext } from '@/shared/libs/react-factories/buildContext';

import { schemaArtifactNewForm } from '../rules/schema/form';
import type { ArtifactNewSidepanelProps as Props } from '../rules/types';

export const [ArtifactNewGeneralModelProvider, useArtifactNewGeneralModel] =
  buildContext('ArtifactNewGeneralModel', (props: Props) => {
    const form = useForm({
      resolver: zodResolver(schemaArtifactNewForm),
      defaultValues: {
        appConfigFile: '',
        fromBranch: '',
        workerId: props.currentServerId || '',
      },
    });

    const fromBranch = form.watch('fromBranch');

    useEffect(() => {
      form.resetField('appConfigFile');
    }, [fromBranch, form]);

    return {
      props,
      form,
      isSubmitting: form.formState.isSubmitting,
      hasChanges: form.formState.isDirty,
    };
  });
