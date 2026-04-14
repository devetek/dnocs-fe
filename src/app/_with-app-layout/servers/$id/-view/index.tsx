import Guard from './_Guard';
import { ServerDetailLayout as Layout } from './_presentation/Layout';
import AsideStatistics from './AsideStatistics';
import Header from './Header';
import MainMgmtTools from './MainMgmtTools';
import MainModules from './MainModules';

export default function ServerDetailView() {
  return (
    <Guard>
      <Header />

      <Layout>
        <Layout.Main>
          <MainMgmtTools />

          <MainModules />
        </Layout.Main>

        <Layout.Aside>
          <AsideStatistics />
        </Layout.Aside>
      </Layout>
    </Guard>
  );
}
