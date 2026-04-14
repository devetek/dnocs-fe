import { useDialog } from '@/services/dialog';
import { useToaster } from '@/services/toaster';

import { ApiArtifact } from '@/shared/api';
import useHandler from '@/shared/libs/react-hooks/useHandler';

import type { ArtifactDeletePayload } from '../-rules/usecase-types';

interface Params {
  onSuccess: () => void;
}

export default function useArtifactDeleteUsecase(params: Params) {
  const { onSuccess } = params;

  const [openDialog] = useDialog();
  const [openToaster] = useToaster();

  const handleUsecase = useHandler((payload: ArtifactDeletePayload) => {
    const { artifactId } = payload;

    const handleDeleteArtifact = async () => {
      const response = await ApiArtifact.Delete.$Id.doDelete({
        id: artifactId,
      });

      if (response.$status === 'success') {
        openToaster({
          variant: 'success',
          message: `Successfully deleted artifact id "${artifactId}".`,
        });

        onSuccess();
        return;
      }

      openToaster({
        variant: 'error',
        title: `Failed to delete artifact id "${artifactId}"!`,
        message: response.error.message,
      });
    };

    openDialog({
      title: 'Delete artifact',
      content: (
        <>
          Are you sure you want to delete artifact with id &ldquo;{artifactId}
          &rdquo; ?
        </>
      ),
      variant: 'warning',
      actions: {
        variant: 'YesNo',
        yes: handleDeleteArtifact,
      },
    });
  });

  return [handleUsecase] as const;
}
