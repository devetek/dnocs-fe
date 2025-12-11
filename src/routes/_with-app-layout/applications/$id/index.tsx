import { createFileRoute } from '@tanstack/react-router';

import EventController from './-EventController';
import { AppDataModelProvider } from './-model/app-data';
import { AppLogsModelProvider } from './-model/app-logs';
import { ArtifactHistoryModelProvider } from './-model/artifact-history';
import { ServerUsageModelProvider } from './-model/server-usage';
import View from './-view';

export const Route = createFileRoute('/_with-app-layout/applications/$id/')({
  component: ApplicationDetailPage,
});

function ApplicationDetailPage() {
  const { id } = Route.useParams();

  return (
    <AppDataModelProvider applicationId={id}>
      <ArtifactHistoryModelProvider applicationId={id}>
        <AppLogsModelProvider>
          <ServerUsageModelProvider>
            <EventController />
            <View />
          </ServerUsageModelProvider>
        </AppLogsModelProvider>
      </ArtifactHistoryModelProvider>
    </AppDataModelProvider>
  );
}
