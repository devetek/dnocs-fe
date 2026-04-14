import { useApplicationSetupEditSidepanel } from '@/features/application-setup-edit-sidepanel';

import useHandler from '@/shared/libs/react-hooks/useHandler';

import type { ApplicationSetupEditPayload } from '../-rules/usecase-types';

interface Params {
  onSuccess: () => void;
}

export default function useApplicationSetupEditUsecase(params: Params) {
  const { onSuccess } = params;

  const [openSidepanel] = useApplicationSetupEditSidepanel();

  const handleUsecase = useHandler((payload: ApplicationSetupEditPayload) => {
    openSidepanel({
      onSuccess,
      applicationId: payload.applicationId,
      applicationName: payload.applicationName,
      rawAppDefinition: payload.rawAppDefinition,
      language: payload.language,
      languages: payload.languages,
    });
  });

  return [handleUsecase] as const;
}
