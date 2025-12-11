import { createFileRoute } from '@tanstack/react-router';

import EventController from './-EventController';
import { ServerDataModelProvider } from './-model/server-data';
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
        <EventController />

        <ServerDetailView />
      </ServerStatsModelProvider>
    </ServerDataModelProvider>
  );
}
