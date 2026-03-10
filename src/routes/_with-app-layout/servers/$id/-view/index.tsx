import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/shared/presentation/atoms/Tabs';

import Guard from './_Guard';
import { ServerDetailLayout as Layout } from './_presentation/Layout';
import AsideStatistics from './AsideStatistics';
import Header from './Header';
import MainMgmtTools from './MainMgmtTools';
import MainModules from './MainModules';
import MainServices from './MainServices';
import MainNetworkInterfaces from './NetworkInterfaces';

export default function ServerDetailView() {
  return (
    <Guard>
      <Header />

      <Layout>
        <Layout.Main>
          <MainMgmtTools />
          <MainModules />
          <Tabs defaultValue="services">
            <TabsList>
              <TabsTrigger value="services">Services</TabsTrigger>
              <TabsTrigger value="network">Networks</TabsTrigger>
              <TabsTrigger value="ports">Ports</TabsTrigger>
              <TabsTrigger value="syslog">Syslog</TabsTrigger>
            </TabsList>
            <TabsContent value="services">
              <MainServices />
            </TabsContent>
            <TabsContent value="network">
              {/* HIT API: https://pawon.terpusat.com/api/v1/server/origin/$serverId/network-interface */}
              <MainNetworkInterfaces />
            </TabsContent>
            <TabsContent value="ports">
              {/* HIT API:  https://pawon.terpusat.com/api/v1/server/origin/$serverId/port-in-used */}
              <MainNetworkInterfaces />
            </TabsContent>
            <TabsContent value="syslog">
              {/* HIT API:  https://pawon-dev.terpusat.com/api/v1/server/origin/$serverId/log?file=/var/log/syslog&line=100 */}
              <MainNetworkInterfaces />
            </TabsContent>
          </Tabs>
        </Layout.Main>

        <Layout.Aside>
          <AsideStatistics />
        </Layout.Aside>
      </Layout>
    </Guard>
  );
}
