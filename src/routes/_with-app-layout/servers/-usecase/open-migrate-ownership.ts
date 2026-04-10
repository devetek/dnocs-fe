import { useMigrateOwnershipModal } from '@/features/migrate-ownership-modal';

import useHandler from '@/shared/libs/react-hooks/useHandler';

import type { ServerMigrateOwnershipPayload as Payload } from './types';

interface Params {
  onSuccess: () => void;
}

export default function useServerOpenMigrateOwnershipUsecase(params: Params) {
  const { onSuccess } = params;

  const [openModalMigrateOwnership] = useMigrateOwnershipModal();

  const handleUsecase = useHandler((payload: Payload) => {
    openModalMigrateOwnership({
      mod: {
        type: 'server',
        moduleId: payload.serverId,
        moduleName: payload.serverName,
        moduleTeam: payload.serverTeam
          ? {
              name: payload.serverTeam,
            }
          : undefined,
      },
      onSuccess,
    });
  });

  return [handleUsecase] as const;
}
