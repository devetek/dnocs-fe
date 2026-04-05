import { useEmit, useSubscribe } from './-model/events';
import useAddNewSshKeyUsecase from './-usecase/use-add-new-ssh-key';
import useDeleteSshKeyUsecase from './-usecase/use-delete-ssh-key';
import useOpenDetailsSshKeyUsecase from './-usecase/use-open-details';

export default function EventController() {
  const emit = useEmit();

  const handleDefaultSuccess = () => {
    emit('@ssh-keys/data--refresh', null);
  };

  const [handleAddNew] = useAddNewSshKeyUsecase();
  const [handleDelete] = useDeleteSshKeyUsecase({
    onSuccess: handleDefaultSuccess,
  });
  const [handleOpenDetails] = useOpenDetailsSshKeyUsecase();

  useSubscribe('@ssh-keys/add-new', handleAddNew);
  useSubscribe('@ssh-keys/ssh-key--delete', handleDelete);
  useSubscribe('@ssh-keys/open--details', handleOpenDetails);

  return null;
}
