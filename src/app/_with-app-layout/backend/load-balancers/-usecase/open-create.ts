import { useLoadBalancerCreationSidepanel } from '@/features/load-balancer-creation-sidepanel';

import useHandler from '@/shared/libs/react-hooks/useHandler';

import { useEmit } from '../-models/events';

export default function useLbOpenCreateUsecase() {
  const [openSidepanel] = useLoadBalancerCreationSidepanel();
  const emit = useEmit();

  const handleUsecase = useHandler(() => {
    openSidepanel({
      onSuccess: () => {
        emit('@load-balancers/data--refresh', null);
      },
    });
  });

  return [handleUsecase] as const;
}
