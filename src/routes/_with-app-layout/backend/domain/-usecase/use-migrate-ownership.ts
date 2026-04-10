import { useMigrateOwnershipModal } from '@/features/migrate-ownership-modal';

import useHandler from '@/shared/libs/react-hooks/useHandler';

import type { DomainMigrateOwnershipPayload as Payload } from '../-rules/usecase-types';

interface Params {
  onSuccess: () => void;
}

export default function useDomainOpenMigrateOwnershipUsecase(params: Params) {
  const { onSuccess } = params;

  const [openModalMigrateOwnership] = useMigrateOwnershipModal();

  const handleUsecase = useHandler((payload: Payload) => {
    openModalMigrateOwnership({
      mod: {
        type: 'domain',
        moduleId: payload.id,
        moduleName: payload.domain.hostname,
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
