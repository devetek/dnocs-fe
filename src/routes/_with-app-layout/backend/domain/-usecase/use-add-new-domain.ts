import type { DomainRegistrationRules } from '@/features/domain-registration-sidepanel';
import { useDomainRegistrationSidepanel } from '@/features/domain-registration-sidepanel';

import useHandler from '@/shared/libs/react-hooks/useHandler';

export default function useAddNewDomainUsecase(
  props: DomainRegistrationRules.Types.SidepanelProps,
) {
  const [openSidepanel] = useDomainRegistrationSidepanel();

  const handleUsecase = useHandler(() => {
    openSidepanel(props);
  });

  return [handleUsecase] as const;
}
