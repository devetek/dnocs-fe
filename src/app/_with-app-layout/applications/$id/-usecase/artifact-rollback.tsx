import { useArtifactRollbackModal } from '@/features/artifact-rollback-modal';

import useHandler from '@/shared/libs/react-hooks/useHandler';

import type { ArtifactRollbackPayload } from '../-rules/usecase-types';

interface Params {
  onSuccess: () => void;
}

export default function useArtifactRollbackUsecase(params: Params) {
  const { onSuccess } = params;

  const [openRollbackModal] = useArtifactRollbackModal();

  const handleUsecase = useHandler((payload: ArtifactRollbackPayload) => {
    const { commitHead, artifactId, applicationId } = payload;

    openRollbackModal({
      commitHead,
      artifactId,
      applicationId,
      onSuccess,
    });
  });

  return [handleUsecase] as const;
}
