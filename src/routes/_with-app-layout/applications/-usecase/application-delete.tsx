import { useDialog } from '@/services/dialog';
import { useToaster } from '@/services/toaster';

import { ApiApplication } from '@/shared/api';
import useHandler from '@/shared/libs/react-hooks/useHandler';

import type { ApplicationDeletePayload as Payload } from '../-rules/usecase-types';

interface Params {
  onSuccess: () => void;
}

export default function useApplicationDeleteUsecase(params: Params) {
  const { onSuccess } = params;

  const [openDialog] = useDialog();

  const [openToaster] = useToaster();

  const handleUsecase = useHandler((payload: Payload) => {
    const { appName, id } = payload;

    const handleDeleteApplication = async () => {
      const response = await ApiApplication.Delete.$Id.doDelete({
        applicationId: id,
      });

      if (response.$status === 'success') {
        openToaster({
          variant: 'success',
          message: `Successfully deleted application "${appName}".`,
        });
        onSuccess();
        return;
      }
      openToaster({
        variant: 'error',
        title: `Failed to delete application "${appName}"!`,
        message: response.error.message,
      });
    };

    openDialog({
      title: 'Delete module',
      content: (
        <>
          Are you sure you want to delete application &ldquo;{appName}&rdquo; ?
        </>
      ),
      variant: 'warning',
      actions: {
        variant: 'YesNo',
        yes: handleDeleteApplication,
      },
    });
  });

  return [handleUsecase] as const;
}
