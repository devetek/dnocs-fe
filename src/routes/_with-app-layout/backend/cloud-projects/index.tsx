import { createFileRoute } from '@tanstack/react-router';

import { PageHeader } from '@/shared/presentation/organisms/PageHeader';

import { FilterProvider } from './-model/filters';
import { FilterBar, GridList } from './-view';

export const Route = createFileRoute(
  '/_with-app-layout/backend/cloud-projects/',
)({
  component: DatabasePage,
});

function DatabasePage() {
  return (
    <>
      <PageHeader
        title="Cloud Projects"
        description="View your cloud projects here."
        footnote={
          <>
            Visit our{' '}
            <a className="underline" href="//www.youtube.com/@dpanel_id">
              YouTube channel
            </a>{' '}
            for a tutorial on how to register new cloud project.
          </>
        }
      />

      <FilterProvider>
        <FilterBar />
        <GridList />
      </FilterProvider>
    </>
  );
}
