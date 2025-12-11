import { createFileRoute } from '@tanstack/react-router';
import { zodValidator } from '@tanstack/zod-adapter';
import z from 'zod';

import { PageHeader } from '@/shared/presentation/organisms/PageHeader';

import { FilterProvider } from './-model';
import { FilterBar, OrganizationPeople } from './-view';

const qsSchema = z.object({
  q: z.string().optional(),
  page: z.number().default(1),
});

export const Route = createFileRoute('/_with-app-layout/teams/$id/')({
  component: OrganizationPeoplePage,
  validateSearch: zodValidator(qsSchema),
});

function OrganizationPeoplePage() {
  const { id } = Route.useParams();

  return (
    <>
      <PageHeader title="Members" description="Manage team members" />

      <FilterProvider>
        <FilterBar />
        <OrganizationPeople orgID={id} />
      </FilterProvider>
    </>
  );
}
