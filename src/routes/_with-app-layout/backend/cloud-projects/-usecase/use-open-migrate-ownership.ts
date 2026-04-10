import { useMigrateOwnershipModal } from '@/features/migrate-ownership-modal';

import useHandler from '@/shared/libs/react-hooks/useHandler';

import type { CloudProjectMigrateOwnershipPayload as Payload } from '../-rules/usecase-types';

interface Params {
  onSuccess: () => void;
}

export default function useOpenCloudProjectMigrateOwnershipUsecase(
  params: Params,
) {
  const { onSuccess } = params;

  const [openModalMigrateOwnership] = useMigrateOwnershipModal();

  const handleUsecase = useHandler((payload: Payload) => {
    openModalMigrateOwnership({
      mod: {
        type: 'cloud-project',
        moduleId: String(payload.id),
        moduleName: payload.name,
        moduleTeam: payload.teamName
          ? {
              name: payload.teamName,
            }
          : undefined,
      },
      onSuccess,
    });
  });

  return [handleUsecase] as const;
}
