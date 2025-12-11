import { Card } from '@/shared/presentation/atoms/Card';
import { AsideHelpSupport } from '@/widgets/aside-help-support';

import { Layout } from './_presentation/Layout';
import FilterBar from './FilterBar';
import Header from './Header';
import ServerList from './ServerList';

export default function ServersView() {
  return (
    <Layout>
      <Header />

      <Layout.Content>
        <Layout.Main>
          <FilterBar />
          <ServerList />
        </Layout.Main>
        <Layout.Aside>
          <Card className="rounded-2xl">
            <AsideHelpSupport.Complete topic="server" />
          </Card>
        </Layout.Aside>
      </Layout.Content>
    </Layout>
  );
}
