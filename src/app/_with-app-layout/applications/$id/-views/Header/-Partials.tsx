import { useDevetekTranslations } from '@/services/i18n';

import { Breadcrumb } from '@/shared/presentation/molecules/Breadcrumb';

export function HeaderBreadcrumb() {
  const t = useDevetekTranslations();

  return (
    <Breadcrumb
      items={[
        {
          text: t('sidebar.dashboard'),
          url: '/dashboard',
        },
        {
          text: t('page.applications.headerTitle'),
          url: '/applications',
        },
      ]}
    />
  );
}
