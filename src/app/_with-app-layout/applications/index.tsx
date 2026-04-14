import { createFileRoute } from '@tanstack/react-router';

import EventController from './-EventController';
import { AppsDataModelProvider } from './-model/apps-data';
import { FilterModelProvider } from './-model/filters';
import View from './-view';

export const Route = createFileRoute('/_with-app-layout/applications/')({
  component: ApplicationsPage,
});

function ApplicationsPage() {
  return (
    <FilterModelProvider>
      <AppsDataModelProvider>
        <EventController />
        <View />
      </AppsDataModelProvider>
    </FilterModelProvider>
  );
}
