import { useApplicationRunEditSidepanel } from '@/features/application-run-edit-sidepanel';

import useHandler from '@/shared/libs/react-hooks/useHandler';

import type { ApplicationRunEditPayload } from '../-rules/usecase-types';

interface Params {
  onSuccess: () => void;
}

export default function useApplicationRunEditUsecase(params: Params) {
  const { onSuccess } = params;

  const [openSidepanel] = useApplicationRunEditSidepanel();

  const handleUsecase = useHandler((payload: ApplicationRunEditPayload) => {
    if (!payload.rawAppDefinition) return;

    openSidepanel({
      onSuccess,
      applicationId: payload.applicationId,
      applicationName: payload.applicationName,
      rawAppDefinition: payload.rawAppDefinition,
      command: payload.command,
      envs: payload.envs,
    });
  });

  return [handleUsecase] as const;
}
