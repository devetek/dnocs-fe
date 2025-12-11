import { useDevetekTranslations } from '@/services/i18n';

import { Breadcrumb } from '@/shared/presentation/molecules/Breadcrumb';

function Headnote() {
  const t = useDevetekTranslations();

  return (
    <span className="flex items-center justify-between">
      <Breadcrumb
        items={[
          {
            text: t('sidebar.dashboard'),
            url: '/dashboard',
          },
          {
            text: 'Servers',
            url: '/resources/servers',
          },
        ]}
      />
    </span>
  );
}

export const HeaderPartials = {
  Headnote,
};
