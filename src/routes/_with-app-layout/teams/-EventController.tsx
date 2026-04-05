import { useEmit, useSubscribe } from './-model/events';
import useAddNewOrgUsecase from './-usecase/use-add-new-org';
import useDeleteOrgUsecase from './-usecase/use-delete-org';
import useOpenDetailsOrgUsecase from './-usecase/use-open-details';

export default function EventController() {
  const emit = useEmit();

  const handleDefaultSuccess = () => {
    emit('@teams/data--refresh', null);
  };

  const [handleAddNew] = useAddNewOrgUsecase();
  const [handleDelete] = useDeleteOrgUsecase({
    onSuccess: handleDefaultSuccess,
  });
  const [handleOpenDetails] = useOpenDetailsOrgUsecase();

  useSubscribe('@teams/add-new', handleAddNew);
  useSubscribe('@teams/org--delete', handleDelete);
  useSubscribe('@teams/open--details', handleOpenDetails);

  return null;
}
