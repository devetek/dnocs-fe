import { createFileRoute } from '@tanstack/react-router';

import { PageHeader } from '@/shared/presentation/organisms/PageHeader';

import { FilterProvider } from './-model/filter';
import { FilterBar, Organizations } from './-view';

export const Route = createFileRoute('/_with-app-layout/teams/')({
  component: OrganizationsPage,
});

function OrganizationsPage() {
  return (
    <>
      <PageHeader
        title="Teams"
        description="Create a team to organize resources and applications"
      />

      <FilterProvider>
        <FilterBar />
        <Organizations />
      </FilterProvider>
    </>
  );
}
