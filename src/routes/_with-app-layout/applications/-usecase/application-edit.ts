import type { ApplicationCard } from '@/entities/application/rules/schema';

import { useApplicationEditSidepanel } from '@/features/application-edit-sidepanel';

import useHandler from '@/shared/libs/react-hooks/useHandler';

interface Params {
  onSuccess: () => void;
}

export default function useApplicationEditUsecase(params: Params) {
  const { onSuccess } = params;

  const [openApplicationEditSidepanel] = useApplicationEditSidepanel();

  const handleUsecase = useHandler((data: ApplicationCard) => {
    if (data.identity.source !== 'repository') return;

    if (!data.identity.repoName || !data.identity.repoOrganization) return;

    const { id, identity, configDefs } = data;

    openApplicationEditSidepanel({
      onSuccess,
      applicationId: id,
      applicationName: identity.name,
      repoName: identity.repoName,
      repoOrganization: identity.repoOrganization,
      autoDeploy: {
        fromBranch: configDefs.cicd.autoDeploy.enabled
          ? configDefs.cicd.autoDeploy.fromBranch
          : undefined,
        isEnabled: configDefs.cicd.autoDeploy.enabled,
      },
    });
  });

  return [handleUsecase] as const;
}
