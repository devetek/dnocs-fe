import Guard from './_Guard';
import Layout from './_presentation/Layout';
import AppInformation from './AppInformation';
import AppLogs from './AppLogs';
import ArtifactsHistory from './ArtifactsHistory';
import BannerGithubLogin from './BannerGithubLogin';
import DangerZone from './DangerZone';
import Header from './Header';

export default function ApplicationsDetailView() {
  return (
    <Guard>
      <Layout>
        <Header />

        <Layout.Content>
          <Layout.Main>
            <BannerGithubLogin />
            <ArtifactsHistory />
            <AppLogs />
            <DangerZone />
          </Layout.Main>

          <Layout.Aside>
            <AppInformation />
          </Layout.Aside>
        </Layout.Content>
      </Layout>
    </Guard>
  );
}
