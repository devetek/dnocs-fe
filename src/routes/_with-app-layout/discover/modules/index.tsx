import { createFileRoute } from '@tanstack/react-router';
import { PuzzleIcon } from 'lucide-react';

import { PageHeader } from '@/shared/presentation/organisms/PageHeader';

import { FiltersProvider } from './-model/filters';
import { ServerDetailProvider } from './-model/server-detail';
import { DiscoverModulesLayout as Layout } from './-presentation/Layout';
import { AsideFilters } from './-view/AsideFilters';
import { ModulesGrid } from './-view/ModulesGrid';

export const Route = createFileRoute('/_with-app-layout/discover/modules/')({
  component: DiscoverModulesPage,
});

function DiscoverModulesPage() {
  return (
    <>
      <PageHeader
        title="Modules Discovery"
        description="Discover tons of modules for your server."
        heroIcon={PuzzleIcon}
      />

      <FiltersProvider>
        <ServerDetailProvider>
          <Layout>
            <Layout.Main>
              <ModulesGrid />
            </Layout.Main>

            <Layout.Aside>
              <AsideFilters />
            </Layout.Aside>
          </Layout>
        </ServerDetailProvider>
      </FiltersProvider>
    </>
  );
}
