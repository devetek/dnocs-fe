import { useDialog } from '@/services/dialog';
import { useToaster } from '@/services/toaster';

import { ApiDeploy } from '@/shared/api';
import useHandler from '@/shared/libs/react-hooks/useHandler';

import type { DeploymentRestorePayload } from '../-rules/usecase-types';

interface Params {
  onSuccess: () => void;
}

export default function useDeploymentRestoreUsecase(params: Params) {
  const { onSuccess } = params;

  const [openDialog] = useDialog();
  const [openToaster] = useToaster();

  const handleUsecase = useHandler((payload: DeploymentRestorePayload) => {
    const { applicationId, artifactId, workerId } = payload;

    const handleRestoreDeployment = async () => {
      const response = await ApiDeploy.Create.doPost({
        applicationId,
        artifactId,
        workerId,
      });

      if (response.$status === 'success') {
        openToaster({
          variant: 'success',
          message: 'Successfully restored deployment.',
        });

        onSuccess();
        return;
      }
      openToaster({
        variant: 'error',
        title: 'Failed to restore deployment!',
        message: response.error.message,
      });
    };

    openDialog({
      title: 'Restore deployment',
      content: <>Are you sure you want to restore this deployment?</>,
      variant: 'warning',
      actions: {
        variant: 'YesNo',
        yes: handleRestoreDeployment,
      },
    });
  });

  return [handleUsecase] as const;
}
