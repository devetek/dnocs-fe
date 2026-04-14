import { useEmit, useSubscribe } from './-models/events';
import useLbDeleteUsecase from './-usecase/lb-delete';
import useLbRestoreUsecase from './-usecase/lb-restore';
import useLbOpenCreateUsecase from './-usecase/open-create';
import useLbOpenDetailsUsecase from './-usecase/open-details';
import useLbOpenMigrateOwnershipUsecase from './-usecase/open-migrate-ownership';

export default function EventController() {
  const emit = useEmit();

  const handleDefaultSuccess = () => {
    emit('@load-balancers/data--refresh', null);
  };

  const [handleOpenCreate] = useLbOpenCreateUsecase();

  const [handleDelete] = useLbDeleteUsecase({
    onSuccess: handleDefaultSuccess,
  });

  const [handleRestore] = useLbRestoreUsecase({
    onSuccess: handleDefaultSuccess,
  });

  const [handleOpenDetails] = useLbOpenDetailsUsecase();

  const [handleOpenMigrateOwnership] = useLbOpenMigrateOwnershipUsecase({
    onSuccess: handleDefaultSuccess,
  });

  useSubscribe('@load-balancers/open--create', handleOpenCreate);
  useSubscribe('@load-balancers/lb--delete', handleDelete);
  useSubscribe('@load-balancers/lb--restore', handleRestore);
  useSubscribe('@load-balancers/open--details', handleOpenDetails);
  useSubscribe(
    '@load-balancers/open--migrate-ownership',
    handleOpenMigrateOwnership,
  );

  return null;
}
