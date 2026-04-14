import { createFileRoute } from '@tanstack/react-router';

import EventController from './-EventController';
import { FilterModelProvider } from './-model/filters';
import { ServersModelProvider } from './-model/servers';
import ServersView from './-view';

export const Route = createFileRoute('/_with-app-layout/servers/')({
  component: ServersPage,
});

function ServersPage() {
  return (
    <FilterModelProvider>
      <ServersModelProvider>
        <EventController />
        <ServersView />
      </ServersModelProvider>
    </FilterModelProvider>
  );
}
