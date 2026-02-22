import { createFileRoute } from '@tanstack/react-router';
import { zodValidator } from '@tanstack/zod-adapter';

import EventController from './-EventController';
import { FilterModelProvider } from './-models/filters';
import { LbDataModelProvider } from './-models/lb-data';
import { schemaQueryString } from './-rules/qs';
import View from './-view';

export const Route = createFileRoute(
  '/_with-app-layout/backend/load-balancers/',
)({
  component: RouteComponent,
  validateSearch: zodValidator(schemaQueryString),
});

function RouteComponent() {
  return (
    <FilterModelProvider>
      <LbDataModelProvider>
        <EventController />
        <View />
      </LbDataModelProvider>
    </FilterModelProvider>
  );
}
