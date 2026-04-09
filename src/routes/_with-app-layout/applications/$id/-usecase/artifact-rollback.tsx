import { useArtifactRollbackModal } from '@/features/artifact-rollback-modal';

import useHandler from '@/shared/libs/react-hooks/useHandler';

import { useAppDataModel } from '../-model/app-data';
import type { ArtifactRollbackPayload } from '../-rules/usecase-types';

interface Params {
  onSuccess: () => void;
}

export default function useArtifactRollbackUsecase(params: Params) {
  const { onSuccess } = params;

  const [openRollbackModal] = useArtifactRollbackModal();

  const [appDetail] = useAppDataModel((s) => [s.appDetail]);

  const handleUsecase = useHandler((payload: ArtifactRollbackPayload) => {
    const { commitHead, artifactId } = payload;

    if (appDetail.$status !== 'success') return;

    openRollbackModal({
      commitHead,
      artifactId,
      applicationId: appDetail.id,
      deploymentTargets: appDetail.deploymentTargets,
      onSuccess,
    });
  });

  return [handleUsecase] as const;
}
