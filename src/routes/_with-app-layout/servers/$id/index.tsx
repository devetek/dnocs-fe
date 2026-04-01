import { createFileRoute } from '@tanstack/react-router';

import EventController from './-EventController';
import { ServerDataModelProvider } from './-model/server-data';
import { ServerNetworkInterfaceModelProvider } from './-model/server-network-interface';
import { ServerPortInUsedModelProvider } from './-model/server-port-in-used';
import { ServerStatsModelProvider } from './-model/server-stats';
import ServerDetailView from './-view';

export const Route = createFileRoute('/_with-app-layout/servers/$id/')({
  component: ServerDetailPage,
});

function ServerDetailPage() {
  const { id } = Route.useParams();

  return (
    <ServerDataModelProvider serverId={id}>
      <ServerStatsModelProvider serverId={id}>
        <ServerNetworkInterfaceModelProvider serverId={id}>
          <ServerPortInUsedModelProvider serverId={id}>
            <EventController />

            <ServerDetailView />
          </ServerPortInUsedModelProvider>
        </ServerNetworkInterfaceModelProvider>
      </ServerStatsModelProvider>
    </ServerDataModelProvider>
  );
}
