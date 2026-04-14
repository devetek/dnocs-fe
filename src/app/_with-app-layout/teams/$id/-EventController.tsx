import { useEmit, useSubscribe } from './-model/events';
import useAddMemberUsecase from './-usecase/use-add-member';
import useDeleteMemberUsecase from './-usecase/use-delete-member';
import useEditTeamUsecase from './-usecase/use-edit-team';

export default function EventController() {
  const emit = useEmit();

  const handleDefaultSuccess = () => {
    emit('@team-members/data--refresh', null);
  };

  const [handleAddMember] = useAddMemberUsecase();
  const [handleDeleteMember] = useDeleteMemberUsecase({
    onSuccess: handleDefaultSuccess,
  });
  const [handleEditTeam] = useEditTeamUsecase();

  useSubscribe('@team-members/add-member', handleAddMember);
  useSubscribe('@team-members/member--delete', handleDeleteMember);
  useSubscribe('@team-members/edit-team', handleEditTeam);

  return null;
}
