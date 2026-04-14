import { createFileRoute } from '@tanstack/react-router';
import { zodValidator } from '@tanstack/zod-adapter';

import { Card } from '@/shared/presentation/atoms/Card';
import { AsideHelpSupport } from '@/widgets/aside-help-support';

import EventController from './-EventController';
import { SshKeyDataModelProvider } from './-model/ssh-key-data';
import { FilterModelProvider } from './-model/filters';
import { schemaQueryString } from './-rules/qs';
import { Header, Layout, MainBottomActions, MainFilter, MainList } from './-view';

export const Route = createFileRoute(
  '/_with-app-layout/backend/secret-managers/ssh-key/',
)({
  component: SshKeyPage,
  validateSearch: zodValidator(schemaQueryString),
});

function SshKeyPage() {
  return (
    <FilterModelProvider>
      <SshKeyDataModelProvider>
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
              <AsideHelpSupport.Complete topic="ssh" />
            </Card>
          </Layout.Aside>
        </Layout>
      </SshKeyDataModelProvider>
    </FilterModelProvider>
  );
}
