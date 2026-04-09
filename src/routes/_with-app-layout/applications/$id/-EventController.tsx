import { useEmit, useSubscribe } from './-model/events';
import useArtifactDeleteUsecase from './-usecase/artifact-delete';
import useArtifactProgressCancelUsecase from './-usecase/artifact-progress-cancel';
import useArtifactRollbackUsecase from './-usecase/artifact-rollback';
import useDeploymentDeleteUsecase from './-usecase/deployment-delete';
import useDeploymentRestoreUsecase from './-usecase/deployment-restore';
import useGithubLoginUsecase from './-usecase/github-login';
import useLogsDownloadUsecase from './-usecase/logs-download';

export default function EventController() {
  const emit = useEmit();

  const handleDefaultSuccess = () => {
    emit('@applications::detail/artifact-history-refresh', null);
    emit('@applications::detail/deployment-history-refresh', null);
  };

  const [handleLogsDownload] = useLogsDownloadUsecase();

  const [handleArtifactDelete] = useArtifactDeleteUsecase({
    onSuccess: handleDefaultSuccess,
  });

  const [handleArtifactProgressCancel] = useArtifactProgressCancelUsecase({
    onSuccess: handleDefaultSuccess,
  });

  const [handleArtifactRollback] = useArtifactRollbackUsecase({
    onSuccess: handleDefaultSuccess,
  });

  const [handleDeploymentDelete] = useDeploymentDeleteUsecase({
    onSuccess: handleDefaultSuccess,
  });

  const [handleDeploymentRestore] = useDeploymentRestoreUsecase({
    onSuccess: handleDefaultSuccess,
  });

  const [handleGithubLogin] = useGithubLoginUsecase();

  useSubscribe('@applications::detail/logs-download', handleLogsDownload);

  useSubscribe('@applications::detail/artifact-delete', handleArtifactDelete);

  useSubscribe(
    '@applications::detail/artifact-progress-cancel',
    handleArtifactProgressCancel,
  );

  useSubscribe(
    '@applications::detail/artifact-rollback',
    handleArtifactRollback,
  );

  useSubscribe(
    '@applications::detail/deployment-delete',
    handleDeploymentDelete,
  );

  useSubscribe(
    '@applications::detail/deployment-restore',
    handleDeploymentRestore,
  );

  useSubscribe('@applications::detail/github-login', handleGithubLogin);

  return null;
}
