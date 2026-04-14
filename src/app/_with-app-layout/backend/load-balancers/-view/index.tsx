import { Card } from '@/shared/presentation/atoms/Card';
import { AsideHelpSupport } from '@/widgets/aside-help-support';

import Layout from './-presentation/Layout';
import Header from './Header';
import MainBottomActions from './MainBottomActions';
import MainFilter from './MainFilter';
import MainLbList from './MainLbList';

export default function LoadBalancersView() {
  return (
    <>
      <Header />

      <Layout>
        <Layout.Main>
          <MainFilter />
          <MainLbList />
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
