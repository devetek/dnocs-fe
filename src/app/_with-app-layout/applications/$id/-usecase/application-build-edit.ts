import { useApplicationBuildEditSidepanel } from '@/features/application-build-edit-sidepanel';

import useHandler from '@/shared/libs/react-hooks/useHandler';

import type { ApplicationBuildEditPayload } from '../-rules/usecase-types';

interface Params {
  onSuccess: () => void;
}

export default function useApplicationBuildEditUsecase(params: Params) {
  const { onSuccess } = params;

  const [openSidepanel] = useApplicationBuildEditSidepanel();

  const handleUsecase = useHandler((payload: ApplicationBuildEditPayload) => {
    if (!payload.rawAppDefinition) return;

    openSidepanel({
      onSuccess,
      applicationId: payload.applicationId,
      applicationName: payload.applicationName,
      rawAppDefinition: payload.rawAppDefinition,
      steps: payload.steps,
      envs: payload.envs,
    });
  });

  return [handleUsecase] as const;
}
