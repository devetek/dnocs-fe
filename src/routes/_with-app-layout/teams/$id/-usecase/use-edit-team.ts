import { useOrganizationEditSidepanel } from '@/features/organization-edit-sidepanel';

import useHandler from '@/shared/libs/react-hooks/useHandler';

import { useEmit } from '../-model/events';
import { useMembersDataModel } from '../-model/members-data';

export default function useEditTeamUsecase() {
  const [openSidepanel] = useOrganizationEditSidepanel();
  const emit = useEmit();
  const { members, orgId } = useMembersDataModel();

  const orgName =
    members.$status === 'success' ? (members.orgName ?? orgId) : orgId;
  const orgDescription =
    members.$status === 'success' ? (members.orgDescription ?? undefined) : undefined;

  const handleUsecase = useHandler(() => {
    openSidepanel({
      orgId,
      name: orgName,
      description: orgDescription,
      onSuccess: () => {
        emit('@team-members/data--refresh', null);
      },
    });
  });

  return [handleUsecase] as const;
}
