import { useDialog } from '@/services/dialog';
import { useToaster } from '@/services/toaster';

import { ApiTask } from '@/shared/api';
import useHandler from '@/shared/libs/react-hooks/useHandler';

import { useAppDataModel } from '../-model/app-data';
import type { ArtifactProgressCancelPayload } from '../-rules/usecase-types';

interface Params {
  onSuccess: () => void;
}

export default function useArtifactProgressCancelUsecase(params: Params) {
  const { onSuccess } = params;

  const [openDialog] = useDialog();
  const [openToaster] = useToaster();

  const appDetail = useAppDataModel((s) => s.appDetail);

  const handleUsecase = useHandler((payload: ArtifactProgressCancelPayload) => {
    const { commitHead, serverId } = payload;

    if (appDetail.$status !== 'success') return;

    const handleCancelArtifact = async () => {
      const response =
        await ApiTask.Cancel.BuildArtifact$ApplicationId$ArtifactCommitIdInMachine$ServerId.doPost(
          {
            applicationId: appDetail.id,
            artifactCommitId: commitHead,
            serverId: serverId,
          },
        );

      if (response.$status === 'success') {
        openToaster({
          variant: 'success',
          message: `Successfully canceled deployment "${commitHead}".`,
        });

        onSuccess();
        return;
      }

      openToaster({
        variant: 'error',
        title: `Failed to delete deployment id "${commitHead}"!`,
        message: response.error.message,
      });
    };

    openDialog({
      title: 'Cancel deployment',
      content: (
        <>
          Are you sure you want to cancel deployment for commit &ldquo;
          {commitHead}
          &rdquo; ?
        </>
      ),
      variant: 'warning',
      actions: {
        variant: 'YesNo',
        yes: handleCancelArtifact,
      },
    });
  });

  return [handleUsecase] as const;
}
