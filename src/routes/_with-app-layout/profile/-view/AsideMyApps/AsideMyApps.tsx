import { AsideStatisticsLayout as Layout } from './_presentation/Layout';
import { MyApplications } from './_presentation/RightSidebar';

export default function AsideMyApps() {
  return (
    <Layout>
      <Layout.Item>
        <MyApplications />
      </Layout.Item>
    </Layout>
  );
}
