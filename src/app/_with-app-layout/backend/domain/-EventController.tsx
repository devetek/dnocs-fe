import { useEmit, useSubscribe } from './-models/events';
import useAddNewDomainUsecase from './-usecase/use-add-new-domain';
import useDeleteUsecase from './-usecase/use-domain-delete';
// import useLbDeleteUsecase from './-usecase/lb-delete';
import useOpenDetailsUsecase from './-usecase/use-domain-details';
import useDomainOpenMigrateOwnershipUsecase from './-usecase/use-migrate-ownership';

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

  const [handleOpenMigrateOwnership] = useDomainOpenMigrateOwnershipUsecase({
    onSuccess: handleDefaultSuccess,
  });

  useSubscribe('@domain-dns/add-new-domain', handleAddNewDomain);
  useSubscribe('@domain-dns/domain--delete', handleDelete);
  useSubscribe('@domain-dns/open--details', handleOpenDetails);
  useSubscribe(
    '@domain-dns/open--migrate-ownership',
    handleOpenMigrateOwnership,
  );

  return null;
}
