import { useApplicationEditSidepanel } from '@/features/application-edit-sidepanel';

import useHandler from '@/shared/libs/react-hooks/useHandler';

import type { ApplicationEditPayload } from '../-rules/usecase-types';

interface Params {
  onSuccess: () => void;
}

export default function useApplicationEditUsecase(params: Params) {
  const { onSuccess } = params;

  const [openSidepanel] = useApplicationEditSidepanel();

  const handleUsecase = useHandler((payload: ApplicationEditPayload) => {
    openSidepanel({
      onSuccess,
      applicationId: payload.applicationId,
      applicationName: payload.applicationName,
      repoName: payload.repoName,
      repoOrganization: payload.repoOrganization,
      rawAppDefinition: payload.rawAppDefinition,
      workdir: payload.workdir,
      port: payload.port,
      autoDeploy: payload.autoDeploy,
    });
  });

  return [handleUsecase] as const;
}
