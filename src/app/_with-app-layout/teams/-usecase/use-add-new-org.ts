import { useOrganizationCreateModal } from '@/features/organization-create-modal';

import useHandler from '@/shared/libs/react-hooks/useHandler';

import { useEmit } from '../-model/events';

export default function useAddNewOrgUsecase() {
  const [openModal] = useOrganizationCreateModal();
  const emit = useEmit();

  const handleUsecase = useHandler(() => {
    openModal({
      onSubmitSuccess: () => {
        emit('@teams/data--refresh', null);
      },
    });
  });

  return [handleUsecase] as const;
}
