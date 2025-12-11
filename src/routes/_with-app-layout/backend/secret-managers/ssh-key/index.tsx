import { createFileRoute } from '@tanstack/react-router';

import { PageHeader } from '@/shared/presentation/organisms/PageHeader';

import { FilterProvider } from './-model/filters';
import { FilterBar } from './-view';
import ModeSshKey from './-view/ModeSshKey/ModeSshKey';

export const Route = createFileRoute(
  '/_with-app-layout/backend/secret-managers/ssh-key/',
)({
  component: SshKeyPage,
});

export default function SshKeyPage() {
  return (
    <>
      <PageHeader
        title="SSH Keys"
        description="View your ssh key and use it to access your virtual machine."
      />

      <FilterProvider>
        <FilterBar />

        <ModeSshKey />
      </FilterProvider>
    </>
  );
}
