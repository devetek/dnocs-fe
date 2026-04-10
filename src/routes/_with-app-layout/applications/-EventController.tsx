import { useEmit, useSubscribe } from './-model/events';
import useApplicationDeleteUsecase from './-usecase/application-delete';
import useApplicationEditUsecase from './-usecase/application-edit';
import useGithubLoginUsecase from './-usecase/github-login';
import useApplicationOpenMigrateOwnershipUsecase from './-usecase/open-migrate-ownership';

export default function EventController() {
  const emit = useEmit();

  const handleDefaultSuccess = () => {
    emit('@applications/application-refresh', null);
  };

  const [handleOpenMigrateOwnership] =
    useApplicationOpenMigrateOwnershipUsecase({
      onSuccess: handleDefaultSuccess,
    });

  const [handleApplicationDelete] = useApplicationDeleteUsecase({
    onSuccess: handleDefaultSuccess,
  });

  const [handleApplicationEdit] = useApplicationEditUsecase({
    onSuccess: handleDefaultSuccess,
  });

  const [handleGithubLogin] = useGithubLoginUsecase();

  useSubscribe(
    '@applications/open--migrate-ownership',
    handleOpenMigrateOwnership,
  );
  useSubscribe('@applications/application-delete', handleApplicationDelete);
  useSubscribe('@applications/application-edit', handleApplicationEdit);
  useSubscribe('@applications/github-login', handleGithubLogin);

  return null;
}
