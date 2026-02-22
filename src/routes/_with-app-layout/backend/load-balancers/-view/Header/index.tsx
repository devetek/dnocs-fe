import { useDevetekTranslations } from '@/services/i18n';

import { Breadcrumb } from '@/shared/presentation/molecules/Breadcrumb';
import { PageHeader } from '@/shared/presentation/organisms/PageHeader';

const Headnote = () => {
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
            text: t('sidebar.backend'),
          },
        ]}
      />
    </span>
  );
};

export default function Header() {
  const t = useDevetekTranslations();

  return (
    <PageHeader
      headnote={<Headnote />}
      title={t('page.loadBalancers.headerTitle')}
      description={t('page.loadBalancers.headerDesc')}
      footnote={t.rich('page.loadBalancers.headerFootnote', {
        a: (chunks) => (
          <a className="underline" href="//www.youtube.com/@dpanel_id">
            {chunks}
          </a>
        ),
      })}
    />
  );
}
