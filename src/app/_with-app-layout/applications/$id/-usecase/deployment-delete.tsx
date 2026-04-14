import { useDialog } from '@/services/dialog';
import { useToaster } from '@/services/toaster';

import { ApiDeploy } from '@/shared/api';
import useHandler from '@/shared/libs/react-hooks/useHandler';

import type { DeploymentDeletePayload } from '../-rules/usecase-types';

interface Params {
  onSuccess: () => void;
}

export default function useDeploymentDeleteUsecase(params: Params) {
  const { onSuccess } = params;

  const [openDialog] = useDialog();
  const [openToaster] = useToaster();

  const handleUsecase = useHandler((payload: DeploymentDeletePayload) => {
    const { deploymentId } = payload;

    const handleDeleteDeployment = async () => {
      const response = await ApiDeploy.Delete.$Id.doDelete({
        id: deploymentId,
      });

      if (response.$status === 'success') {
        openToaster({
          variant: 'success',
          message: `Successfully deleted deployment id "${deploymentId}".`,
        });

        onSuccess();
        return;
      }
      openToaster({
        variant: 'error',
        title: `Failed to delete deployment id "${deploymentId}"!`,
        message: response.error.message,
      });
    };

    openDialog({
      title: 'Delete deployment',
      content: (
        <>
          Are you sure you want to delete deployment with id &ldquo;
          {deploymentId}
          &rdquo; ?
        </>
      ),
      variant: 'warning',
      actions: {
        variant: 'YesNo',
        yes: handleDeleteDeployment,
      },
    });
  });

  return [handleUsecase] as const;
}
