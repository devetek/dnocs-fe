import { createFileRoute } from '@tanstack/react-router';
import { zodValidator } from '@tanstack/zod-adapter';

import EventController from './-EventController';
import { DomainDataModelProvider } from './-models/domain-data';
import { FilterModelProvider } from './-models/filters';
import { schemaQueryString } from './-rules/qs';
import View from './-view';

export const Route = createFileRoute('/_with-app-layout/backend/domain/')({
  component: RouteComponent,
  validateSearch: zodValidator(schemaQueryString),
});

function RouteComponent() {
  return (
    <FilterModelProvider>
      <DomainDataModelProvider>
        <EventController />
        <View />
      </DomainDataModelProvider>
    </FilterModelProvider>
  );
}
