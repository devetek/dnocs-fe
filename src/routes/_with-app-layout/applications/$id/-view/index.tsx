import Guard from './_Guard';
import Layout from './_presentation/Layout';
import AppInformation from './AppInformation';
import AppLogs from './AppLogs';
import ArtifactsHistory from './ArtifactsHistory';
import BannerGithubLogin from './BannerGithubLogin';
import Header from './Header';
import ServiceActions from './ServiceActions';

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
          </Layout.Main>

          <Layout.Aside>
            <ServiceActions />
            <AppInformation />
          </Layout.Aside>
        </Layout.Content>
      </Layout>
    </Guard>
  );
}
