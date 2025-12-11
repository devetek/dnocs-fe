import { Outlet, createFileRoute } from '@tanstack/react-router';

import { AppLayout } from '@/features/app-shell';

export const Route = createFileRoute('/_with-app-layout')({
  component: WithAppLayout,
});

function WithAppLayout() {
  return (
    <AppLayout>
      <div className="p-3">
        <Outlet />
      </div>
    </AppLayout>
  );
}
