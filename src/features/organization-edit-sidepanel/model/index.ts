import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { buildContext } from '@/shared/libs/react-factories/buildContext';

import { schemaOrgEdit } from '../rules/form-schema';
import type { OrgEditSidepanelProps } from '../rules/types';

export const [OrgEditModelProvider, useOrgEditModel] = buildContext(
  'OrgEditModel',
  (props: OrgEditSidepanelProps) => {
    const { orgId, onSuccess = () => {} } = props;

    const form = useForm({
      resolver: zodResolver(schemaOrgEdit),
      defaultValues: {
        name: props.name ?? '',
        description: props.description ?? '',
      },
    });

    return {
      orgId,
      form,
      onSuccess,
      isSubmitting: form.formState.isSubmitting,
      hasChanges: form.formState.isDirty,
    };
  },
);
