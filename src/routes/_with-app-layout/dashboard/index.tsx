import { createFileRoute } from '@tanstack/react-router';

import DashboardView from './-view/DashboardView';

export const Route = createFileRoute('/_with-app-layout/dashboard/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <DashboardView />;
}
