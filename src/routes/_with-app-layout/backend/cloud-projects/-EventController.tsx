import { useEmit, useSubscribe } from './-model/events';
import useAddNewCloudProjectUsecase from './-usecase/use-add-new-cloud-project';
import useDeleteCloudProjectUsecase from './-usecase/use-delete-cloud-project';
import useOpenDetailsUsecase from './-usecase/use-open-details';
import useOpenCloudProjectMigrateOwnershipUsecase from './-usecase/use-open-migrate-ownership';

export default function EventController() {
  const emit = useEmit();

  const handleDefaultSuccess = () => {
    emit('@cloud-projects/data--refresh', null);
  };

  const [handleAddNew] = useAddNewCloudProjectUsecase();
  const [handleDelete] = useDeleteCloudProjectUsecase({
    onSuccess: handleDefaultSuccess,
  });
  const [handleOpenDetails] = useOpenDetailsUsecase();
  const [handleOpenMigrateOwnership] =
    useOpenCloudProjectMigrateOwnershipUsecase({
      onSuccess: handleDefaultSuccess,
    });

  useSubscribe('@cloud-projects/add-new', handleAddNew);
  useSubscribe('@cloud-projects/project--delete', handleDelete);
  useSubscribe(
    '@cloud-projects/open--migrate-ownership',
    handleOpenMigrateOwnership,
  );
  useSubscribe('@cloud-projects/open--details', handleOpenDetails);

  return null;
}
