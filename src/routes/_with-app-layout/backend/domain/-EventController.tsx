import { useEmit, useSubscribe } from './-models/events';
import useAddNewDomainUsecase from './-usecase/use-add-new-domain';
import useDeleteUsecase from './-usecase/use-domain-delete';
// import useLbDeleteUsecase from './-usecase/lb-delete';
import useOpenDetailsUsecase from './-usecase/use-domain-details';
// import useLbOpenMigrateOwnershipUsecase from './-usecase/open-migrate-ownership';

export default function EventController() {
  const emit = useEmit();

  const handleDefaultSuccess = () => {
    emit('@domain-dns/data--refresh', null);
  };

  const [handleAddNewDomain] = useAddNewDomainUsecase({
    onSuccess: handleDefaultSuccess,
  });

  const [handleDelete] = useDeleteUsecase({
    onSuccess: handleDefaultSuccess,
  });

  const [handleOpenDetails] = useOpenDetailsUsecase();

  // const [handleOpenMigrateOwnership] = useLbOpenMigrateOwnershipUsecase({
  //   onSuccess: handleDefaultSuccess,
  // });

  useSubscribe('@domain-dns/add-new-domain', handleAddNewDomain);
  useSubscribe('@domain-dns/domain--delete', handleDelete);
  useSubscribe('@domain-dns/open--details', handleOpenDetails);
  // useSubscribe(
  //   '@load-balancers/open--migrate-ownership',
  //   handleOpenMigrateOwnership,
  // );

  return null;
}
