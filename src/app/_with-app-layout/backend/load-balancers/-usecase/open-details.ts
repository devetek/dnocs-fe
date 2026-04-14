import { useLoadBalancerDetailSidepanel } from '@/features/load-balancer-details-sidepanel';

import useHandler from '@/shared/libs/react-hooks/useHandler';

import type { LbOpenDetailsPayload as Payload } from '../-rules/usecase-types';

export default function useLbOpenDetailsUsecase() {
  const [openSidepanel] = useLoadBalancerDetailSidepanel();

  const handleUsecase = useHandler((payload: Payload) => {
    openSidepanel({
      loadBalancerId: payload.id,
    });
  });

  return [handleUsecase] as const;
}
