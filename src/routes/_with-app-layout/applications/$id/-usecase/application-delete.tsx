import { useNavigate } from '@tanstack/react-router';

import { useDialog } from '@/services/dialog';
import { useToaster } from '@/services/toaster';

import { ApiApplication } from '@/shared/api';
import useHandler from '@/shared/libs/react-hooks/useHandler';

import type { ApplicationDeletePayload } from '../-rules/usecase-types';

export default function useApplicationDeleteUsecase() {
  const navigate = useNavigate();
  const [openDialog] = useDialog();
  const [openToaster] = useToaster();

  const handleUsecase = useHandler((payload: ApplicationDeletePayload) => {
    const { applicationId, applicationName } = payload;

    const handleDelete = async () => {
      const response = await ApiApplication.Delete.$Id.doDelete({
        applicationId,
      });

      if (response.$status === 'success') {
        openToaster({
          variant: 'success',
          message: `Application "${applicationName}" has been deleted.`,
        });

        navigate({ to: '/applications' });
        return;
      }

      openToaster({
        variant: 'error',
        title: `Failed to delete application "${applicationName}"!`,
        message: response.error.message,
      });
    };

    openDialog({
      title: 'Delete Application',
      content: (
        <>
          Are you sure you want to permanently delete application &ldquo;
          {applicationName}
          &rdquo;? This action cannot be undone.
        </>
      ),
      variant: 'error',
      actions: {
        variant: 'YesNo',
        yes: handleDelete,
      },
    });
  });

  return [handleUsecase] as const;
}
