import { createFileRoute } from '@tanstack/react-router';
import { zodValidator } from '@tanstack/zod-adapter';
import { PuzzleIcon } from 'lucide-react';
import z from 'zod';

import { PageHeader } from '@/shared/presentation/organisms/PageHeader';

import { FiltersProvider } from './-model/filters';
import { ServerDetailProvider } from './-model/server-detail';
import { DiscoverModulesLayout as Layout } from './-presentation/Layout';
import { AsideFilters } from './-view/AsideFilters';
import { ModulesGrid } from './-view/ModulesGrid';

const qsSchema = z.object({
  serverId: z.string().optional(),
});

export const Route = createFileRoute('/_with-app-layout/discover/modules/')({
  component: DiscoverModulesPage,
  validateSearch: zodValidator(qsSchema),
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
