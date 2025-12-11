import { useDialog } from '@/services/dialog';
import { useToaster } from '@/services/toaster';

import { ApiDeploy } from '@/shared/api';
import useHandler from '@/shared/libs/react-hooks/useHandler';

import { useAppDataModel } from '../-model/app-data';
import type { ArtifactRollbackPayload } from '../-rules/usecase-types';

interface Params {
  onSuccess: () => void;
}

export default function useArtifactRollbackUsecase(params: Params) {
  const { onSuccess } = params;

  const [openDialog] = useDialog();
  const [openToaster] = useToaster();

  const [appDetail, selectedServerId] = useAppDataModel((s) => [
    s.appDetail,
    s.selectedServerId,
  ]);

  const handleUsecase = useHandler((payload: ArtifactRollbackPayload) => {
    const { commitHead, artifactId } = payload;

    if (appDetail.$status !== 'success' || !selectedServerId) return;

    const handleRollbackArtifact = async () => {
      const response = await ApiDeploy.Create.doPost({
        applicationId: appDetail.id,
        artifactId: artifactId,
        workerId: selectedServerId,
      });

      if (response.$status === 'success') {
        openToaster({
          variant: 'success',
          message: `Successfully rollback deployment to "${commitHead}".`,
        });

        onSuccess();
        return;
      }

      openToaster({
        variant: 'error',
        title: `Failed to rollback deployment to "${commitHead}"!`,
        message: response.error.message,
      });
    };

    openDialog({
      title: 'Rollback deployment',
      content: (
        <>
          Are you sure you want to rollback deployment to commit &ldquo;
          {commitHead}
          &rdquo; ?
        </>
      ),
      variant: 'warning',
      actions: {
        variant: 'YesNo',
        yes: handleRollbackArtifact,
      },
    });
  });

  return [handleUsecase] as const;
}
