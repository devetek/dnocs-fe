// import { useMigrateOwnershipModal } from '@/features/migrate-ownership-modal';

import useHandler from '@/shared/libs/react-hooks/useHandler';

import type { LbMigrateOwnershipPayload as Payload } from '../-rules/usecase-types';

interface Params {
  onSuccess: () => void;
}

export default function useLbOpenMigrateOwnershipUsecase(params: Params) {
  const { onSuccess: _1 } = params;

  // const [openModalMigrateOwnership] = useMigrateOwnershipModal();

  const handleUsecase = useHandler((_2: Payload) => {
    // TODO
    // openModalMigrateOwnership({
    //   mod: {
    //     type: 'load-balancer',
    //     ...payload,
    //   },
    //   onSuccess,
    // });
  });

  return [handleUsecase] as const;
}
