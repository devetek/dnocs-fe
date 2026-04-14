import { createFileRoute } from '@tanstack/react-router';
import { zodValidator } from '@tanstack/zod-adapter';

import { Card } from '@/shared/presentation/atoms/Card';
import { AsideHelpSupport } from '@/widgets/aside-help-support';

import EventController from './-EventController';
import { CloudDataModelProvider } from './-model/cloud-data';
import { FilterModelProvider } from './-model/filters';
import { schemaQueryString } from './-rules/qs';
import { Header, Layout, MainBottomActions, MainFilter, MainList } from './-view';

export const Route = createFileRoute(
  '/_with-app-layout/backend/cloud-projects/',
)({
  component: CloudProjectsPage,
  validateSearch: zodValidator(schemaQueryString),
});

function CloudProjectsPage() {
  return (
    <FilterModelProvider>
      <CloudDataModelProvider>
        <EventController />

        <Header />

        <Layout>
          <Layout.Main>
            <MainFilter />
            <MainList />
            <MainBottomActions />
          </Layout.Main>

          <Layout.Aside>
            <Card className="rounded-2xl">
              <AsideHelpSupport.Complete topic="cloud" />
            </Card>
          </Layout.Aside>
        </Layout>
      </CloudDataModelProvider>
    </FilterModelProvider>
  );
}

