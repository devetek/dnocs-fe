import { createFileRoute, useNavigate } from '@tanstack/react-router';

import { KeyRoundIcon } from 'lucide-react';

import { Card } from '@/shared/presentation/atoms/Card';
import { Breadcrumb } from '@/shared/presentation/molecules/Breadcrumb';
import { PageHeader } from '@/shared/presentation/organisms/PageHeader';
import { AsideHelpSupport } from '@/widgets/aside-help-support';
import { FailedState } from '@/widgets/failed-state';
import { ResourceCard } from '@/widgets/resource-card';

import { ApiSecret } from '@/shared/api';

import ModeSshKey from './-view/ModeSSHKey/ModeSSHKey';

export const Route = createFileRoute(
  '/_with-app-layout/backend/secret-managers/ssh-key/$id/',
)({
  component: SshKeyDetailPage,
});

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col-reverse xl:grid xl:grid-cols-[minmax(0,1fr)_0.4fr] gap-4">
      {children}
    </div>
  );
}

function SshKeyDetailPage() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const [responseSSHKey, refresh] = ApiSecret.SshKey.Detail.$Id.useGet({ id });

  const headnote = (
    <span className="flex items-center justify-between">
      <Breadcrumb
        items={[
          { text: 'Dashboard', url: '/dashboard' },
          { text: 'Backend' },
          { text: 'SSH Keys', url: '/backend/secret-managers/ssh-key' },
        ]}
      />
    </span>
  );

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
            ctaText="Back to SSH Keys"
          />
        </div>
      );
    }
    return (
      <FailedState.WallCentered errorPayload={responseSSHKey.error.message} />
    );
  }

  if (responseSSHKey.$status !== 'success') {
    return (
      <>
        <PageHeader
          heroIcon={KeyRoundIcon}
          headnote={headnote}
          title="SSH Key Detail"
          description="Loading key data..."
        />
        <div className="flex flex-col gap-2">
          <ResourceCard.ShimmerFull />
          <ResourceCard.ShimmerFull classNameWrapper="opacity-60" />
          <ResourceCard.ShimmerFull classNameWrapper="opacity-30" />
        </div>
      </>
    );
  }

  const keyName = responseSSHKey.name ?? 'Untitled Key';
  const keyType = responseSSHKey.type ?? '';
  const keyLength = responseSSHKey.data?.length ?? '';

  return (
    <>
      <title>{keyName} — SSH Key | dPanel</title>

      <PageHeader
        heroIcon={KeyRoundIcon}
        headnote={headnote}
        title={keyName}
        description={`${keyType}${keyLength ? ` · ${keyLength} bits` : ''} — Use the keys below to access your virtual machines securely.`}
      />

      <Layout>
        <div className="flex flex-col gap-4">
          <ModeSshKey sshkey={responseSSHKey} />
        </div>

        <aside className="hidden xl:flex flex-col gap-4">
          <Card className="rounded-2xl">
            <AsideHelpSupport.Complete topic="ssh" />
          </Card>
        </aside>
      </Layout>
    </>
  );
}
