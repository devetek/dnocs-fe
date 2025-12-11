import { useEmit, useSubscribe } from './-model/events';
import useApplicationClaimUsecase from './-usecase/application-claim';
import useApplicationDeleteUsecase from './-usecase/application-delete';
import useApplicationEditUsecase from './-usecase/application-edit';
import useGithubLoginUsecase from './-usecase/github-login';

export default function EventController() {
  const emit = useEmit();

  const handleDefaultSuccess = () => {
    emit('@applications/application-refresh', null);
  };

  const [handleApplicationClaim] = useApplicationClaimUsecase({
    onSuccess: handleDefaultSuccess,
  });

  const [handleApplicationDelete] = useApplicationDeleteUsecase({
    onSuccess: handleDefaultSuccess,
  });

  const [handleApplicationEdit] = useApplicationEditUsecase({
    onSuccess: handleDefaultSuccess,
  });

  const [handleGithubLogin] = useGithubLoginUsecase();

  useSubscribe('@applications/application-claim', handleApplicationClaim);
  useSubscribe('@applications/application-delete', handleApplicationDelete);
  useSubscribe('@applications/application-edit', handleApplicationEdit);
  useSubscribe('@applications/github-login', handleGithubLogin);

  return null;
}
