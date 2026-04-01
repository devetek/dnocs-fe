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
import MainNetworkInterface from './MainNetworkInterface';
import MainPortInUsed from './MainPortInUsed';
import MainServices from './MainServices';

export default function ServerDetailView() {
  return (
    <Guard>
      <Header />

      <Layout>
        <Layout.Main>
          <MainMgmtTools />

          <MainModules />

          <Tabs defaultValue="services" className="w-full">
            <TabsList className="w-full grid grid-cols-3">
              <TabsTrigger className="w-full" value="services">
                Services
              </TabsTrigger>
              <TabsTrigger className="w-full" value="port-in-used">
                Port In Used
              </TabsTrigger>
              <TabsTrigger className="w-full" value="network-interface">
                Network Interface
              </TabsTrigger>
            </TabsList>

            <TabsContent value="services">
              <MainServices />
            </TabsContent>

            <TabsContent value="port-in-used">
              <MainPortInUsed />
            </TabsContent>

            <TabsContent value="network-interface">
              <MainNetworkInterface />
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
