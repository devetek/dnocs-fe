import { useToaster } from '@/services/toaster';

import { ApiOrganization } from '@/shared/api';

import { useOrgEditModel } from '../model';
import { useEmit, useSubscribe } from '../model/events';

export default function useFormSubmissionUsecase() {
  const { orgId, form, onSuccess } = useOrgEditModel();

  const [openToaster] = useToaster();

  const emit = useEmit();

  const handleSubmit = form.handleSubmit(async (values) => {
    const response = await ApiOrganization.Update.$Id.doPost({
      orgId,
      payload: {
        name: values.name,
        description: values.description,
      },
    });

    if (response.$status === 'failed') {
      openToaster({
        variant: 'error',
        title: 'Failed to update team',
        message: response.error.message,
      });
      return;
    }

    openToaster({
      variant: 'success',
      message: `Successfully updated "${values.name}"`,
    });

    emit('#org-edit-sidepanel/sidepanel-close', { bypass: true });
    onSuccess();
  });

  useSubscribe('#org-edit-sidepanel/form-submit', () => handleSubmit());
}
