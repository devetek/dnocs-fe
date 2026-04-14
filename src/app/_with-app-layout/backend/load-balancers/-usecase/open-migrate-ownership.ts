import { useMigrateOwnershipModal } from '@/features/migrate-ownership-modal';

import useHandler from '@/shared/libs/react-hooks/useHandler';

import type { LbMigrateOwnershipPayload as Payload } from '../-rules/usecase-types';

interface Params {
  onSuccess: () => void;
}

export default function useLbOpenMigrateOwnershipUsecase(params: Params) {
  const { onSuccess } = params;

  const [openModalMigrateOwnership] = useMigrateOwnershipModal();

  const handleUsecase = useHandler((payload: Payload) => {
    openModalMigrateOwnership({
      mod: {
        type: 'load-balancer',
        moduleId: payload.id,
        moduleName: payload.domain.fqdn,
        moduleTeam: payload.ownership.team
          ? {
              name: payload.ownership.team,
            }
          : undefined,
      },
      onSuccess,
    });
  });

  return [handleUsecase] as const;
}
