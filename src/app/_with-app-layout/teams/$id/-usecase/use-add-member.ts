import { useParams } from '@tanstack/react-router';

import { useOrganizationPeopleCreateModal } from '@/features/organization-people-create-modal';

import useHandler from '@/shared/libs/react-hooks/useHandler';

import { useEmit } from '../-model/events';

export default function useAddMemberUsecase() {
  const [openModal] = useOrganizationPeopleCreateModal();
  const emit = useEmit();
  const { id: orgId } = useParams({ from: '/_with-app-layout/teams/$id/' });

  const handleUsecase = useHandler(() => {
    openModal({
      organization_id: orgId,
      onSubmitSuccess: () => {
        emit('@team-members/data--refresh', null);
      },
    });
  });

  return [handleUsecase] as const;
}
