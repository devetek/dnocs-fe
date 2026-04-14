import { useAuthLoggedIn } from '@/services/auth';
import { useDevetekTranslations } from '@/services/i18n';

import { PageHeader } from '@/shared/presentation/organisms/PageHeader';

export default function Header() {
  const t = useDevetekTranslations();
  const { userProfile } = useAuthLoggedIn();

  const displayName = userProfile.fullname ?? userProfile.username ?? 'there';

  return (
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
  );
}
