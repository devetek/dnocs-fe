import { Card } from '@/shared/presentation/atoms/Card';
import { AsideHelpSupport } from '@/widgets/aside-help-support';

import Layout from './-presentation/Layout';
import { Header } from './Header';
import { Personal } from './Personal';

export default function ProfileView() {
  return (
    <>
      <Header />

      <Layout>
        <Layout.Main>
          <Personal />
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
