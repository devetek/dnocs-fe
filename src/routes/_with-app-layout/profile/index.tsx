import { createFileRoute } from '@tanstack/react-router';

import { ProfileDetailLayout as Layout } from './-presentation/Layout';
// import { AsideMyApps } from "./_view/AsideMyApps";
import { Header } from './-view/Header';
import { LastSubscriptions } from './-view/LastSubscriptions';
import { Personal } from './-view/Personal';
import { Subscription } from './-view/Subscription';

export const Route = createFileRoute('/_with-app-layout/profile/')({
  component: ProfileDetailPage,
});

function ProfileDetailPage() {
  return (
    <>
      <Header />
      <Layout>
        <Layout.Main>
          <Personal />
          <Subscription />
          <LastSubscriptions />
        </Layout.Main>

        <Layout.Aside>{/* <AsideMyApps /> */}</Layout.Aside>
      </Layout>
    </>
  );
}
