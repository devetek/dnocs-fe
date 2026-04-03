import { createFileRoute } from '@tanstack/react-router';

import { Card } from '@/shared/presentation/atoms/Card';
import { AsideHelpSupport } from '@/widgets/aside-help-support';

import { SshDataProvider } from './-model/ssh-data';
import { FilterProvider } from './-model/filters';
import {
  Header,
  Layout,
  MainBottomActions,
  MainFilter,
  MainList,
} from './-view';

export const Route = createFileRoute(
  '/_with-app-layout/backend/secret-managers/ssh-key/',
)({
  component: SshKeyPage,
});

export default function SshKeyPage() {
  return (
    <FilterProvider>
      <SshDataProvider>
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
      </SshDataProvider>
    </FilterProvider>
  );
}
