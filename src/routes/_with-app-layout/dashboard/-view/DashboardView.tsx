import { Card } from '@/shared/presentation/atoms/Card';
import { AsideHelpSupport } from '@/widgets/aside-help-support';

import Layout from './-presentation/Layout';
import Header from './Header';
import QuickStatsView from './QuickStats/QuickStatsView';
import SectionApp from './SectionApp/SectionApp';
import SectionMachine from './SectionMachine/SectionMachine';

export default function DashboardView() {
  return (
    <>
      <Header />

      <Layout>
        <Layout.Main>
          <QuickStatsView />
          <SectionApp />
          <SectionMachine />
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
