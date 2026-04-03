import { Card } from '@/shared/presentation/atoms/Card';
import { AsideHelpSupport } from '@/widgets/aside-help-support';

import { Layout } from './_presentation/Layout';
import FilterBar from './FilterBar';
import Header from './Header';
import MainBottomActions from './MainBottomActions';
import ServerList from './ServerList';

export default function ServersView() {
  return (
    <>
      <Header />

      <Layout>
        <Layout.Main>
          <FilterBar />
          <ServerList />
          <MainBottomActions />
        </Layout.Main>

        <Layout.Aside>
          <Card className="rounded-2xl">
            <AsideHelpSupport.Complete topic="server" />
          </Card>
        </Layout.Aside>
      </Layout>
    </>
  );
}
