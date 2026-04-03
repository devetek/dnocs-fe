import { Card } from '@/shared/presentation/atoms/Card';
import { AsideHelpSupport } from '@/widgets/aside-help-support';

import Layout from './-presentation/Layout';
import Header from './Header';
import MainAppList from './MainAppList';
import MainBottomActions from './MainBottomActions';
import MainFilter from './MainFilter';

export default function ApplicationsView() {
  return (
    <>
      <Header />

      <Layout>
        <Layout.Main>
          <MainFilter />
          <MainAppList />
          <MainBottomActions />
        </Layout.Main>

        <Layout.Aside>
          <Card className="rounded-2xl">
            <AsideHelpSupport.Complete topic="application" />
          </Card>
        </Layout.Aside>
      </Layout>
    </>
  );
}
