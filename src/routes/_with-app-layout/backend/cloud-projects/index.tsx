import { createFileRoute } from '@tanstack/react-router';

import { Card } from '@/shared/presentation/atoms/Card';
import { AsideHelpSupport } from '@/widgets/aside-help-support';

import { CloudDataProvider } from './-model/cloud-data';
import { FilterProvider } from './-model/filters';
import {
  Header,
  Layout,
  MainBottomActions,
  MainFilter,
  MainList,
} from './-view';

export const Route = createFileRoute(
  '/_with-app-layout/backend/cloud-projects/',
)({
  component: DatabasePage,
});

function DatabasePage() {
  return (
    <FilterProvider>
      <CloudDataProvider>
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
      </CloudDataProvider>
    </FilterProvider>
  );
}

