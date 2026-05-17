import { createFileRoute } from '@tanstack/react-router';

import { ResourcesModelProvider } from './-models/resources';
import View from './-views';

export const Route = createFileRoute('/_with-app-layout/applications/new/$id/')({
  component: ApplicationDetailsPage,
});

function ApplicationDetailsPage() {
  const { id: applicationId } = Route.useParams();

  return (
    <ResourcesModelProvider applicationId={applicationId}>
      <View />
    </ResourcesModelProvider>
  );
}
