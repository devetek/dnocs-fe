import { createFileRoute } from '@tanstack/react-router';

import { useAuthLoggedIn } from '@/services/auth';
import { useDevetekTranslations } from '@/services/i18n';

import { PageHeader } from '@/shared/presentation/organisms/PageHeader';

import { QuickStatsView, SectionApp, SectionMachine } from './-view';

export const Route = createFileRoute('/_with-app-layout/dashboard/')({
  component: Dashboard,
});

function Dashboard() {
  const t = useDevetekTranslations();
  const { userProfile } = useAuthLoggedIn();

  const displayName = userProfile.fullname ?? userProfile.username ?? 'there';

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title={t('page.dashboard.headerTitle')}
        description={
          <span>
            Welcome back,{' '}
            <span className="text-primary font-semibold">{displayName}</span>!
            Here is an overview of your infrastructure.
          </span>
        }
      />

      <QuickStatsView />

      <SectionApp />

      <SectionMachine />
    </div>
  );
}
