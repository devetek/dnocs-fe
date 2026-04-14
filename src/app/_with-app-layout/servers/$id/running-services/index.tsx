import { createFileRoute } from '@tanstack/react-router';

import { FilterModelProvider } from './-model/filter';
import { ServiceDataModelProvider } from './-model/service-data';
import { FilterArea } from './-view/FilterArea';
import { Header } from './-view/Header';
import { ServicesView } from './-view/ServicesView';

export const Route = createFileRoute(
  '/_with-app-layout/servers/$id/running-services/',
)({
  component: ServerServicesPage,
});

export default function ServerServicesPage() {
  const { id } = Route.useParams();

  return (
    <FilterModelProvider>
      <ServiceDataModelProvider serverId={id}>
        <Header />

        <FilterArea />
        <ServicesView />
      </ServiceDataModelProvider>
    </FilterModelProvider>
  );
}
