import { createFileRoute } from '@tanstack/react-router';

import View from './-view';

export const Route = createFileRoute('/_with-app-layout/profile/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <View />;
}
