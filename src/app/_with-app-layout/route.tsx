import { Outlet, createFileRoute } from '@tanstack/react-router';

import { AppLayout } from '@/features/app-shell';
import { AuthGuard } from '@/features/auth-toolkit/guard';

export const Route = createFileRoute('/_with-app-layout')({
  component: WithAppLayout,
});

function WithAppLayout() {
  return (
    <AuthGuard>
      <AppLayout>
        <div className="p-3">
          <Outlet />
        </div>
      </AppLayout>
    </AuthGuard>
  );
}
