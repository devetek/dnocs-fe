import { createFileRoute, useNavigate } from '@tanstack/react-router';

import { ApiSecret } from '@/shared/api';
import { Spinner } from '@/shared/presentation/atoms/Spinner';
import { PageHeader } from '@/shared/presentation/organisms/PageHeader';
import { FailedState } from '@/widgets/failed-state';

import ModeSshKey from './-view/ModeSSHKey/ModeSSHKey';

export const Route = createFileRoute(
  '/_with-app-layout/backend/secret-managers/ssh-key/$id/',
)({
  component: SshKeyDetailPage,
});

function SshKeyDetailPage() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const [responseSSHKey, refresh] = ApiSecret.SshKey.Detail.$Id.useGet({
    id,
  });

  if (responseSSHKey.$status === 'failed') {
    if (
      responseSSHKey.kind === 'api' &&
      Number(responseSSHKey.error.code) < 500
    ) {
      return (
        <div className="h-full">
          <FailedState.WallCentered
            errorPayload={responseSSHKey.error.message}
            ctaOnClick={() =>
              navigate({
                to: '/backend/secret-managers/ssh-key',
                replace: true,
              })
            }
            ctaText="Back"
          />
        </div>
      );
    } else {
      return (
        <FailedState.WallCentered errorPayload={responseSSHKey.error.message} />
      );
    }
  }

  if (responseSSHKey.$status !== 'success') {
    return (
      <div className="w-full flex justify-center">
        <Spinner />
      </div>
    );
  }

  const sshKeyDisplayName = responseSSHKey.name ?? '';

  return (
    <>
      <title>SSH Key Detail | dPanel</title>

      <PageHeader
        title={`${sshKeyDisplayName} - SSH Key`}
        description="View detail ssh key and use it to access your virtual machine."
      />

      <ModeSshKey sshkey={responseSSHKey} refresh={refresh} />
    </>
  );
}
