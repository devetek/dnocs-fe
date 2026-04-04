import { useDomainDetailsSidepanel } from '@/features/domain-details-sidepanel';

import useHandler from '@/shared/libs/react-hooks/useHandler';

import type { DomainDetailsPayload as Payload } from '../-rules/usecase-types';

export default function useOpenDetailsUsecase() {
  const [openSidepanel] = useDomainDetailsSidepanel();

  const handleUsecase = useHandler((payload: Payload) => {
    openSidepanel({
      domainId: payload,
    });
  });

  return [handleUsecase] as const;
}
