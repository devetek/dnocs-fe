import { PlusCircleIcon } from 'lucide-react';

import { useDevetekTranslations } from '@/services/i18n';

import { Button } from '@/shared/presentation/atoms/ButtonV2';
import { Breadcrumb } from '@/shared/presentation/molecules/Breadcrumb';
import { PageHeader } from '@/shared/presentation/organisms/PageHeader';

import { useEmit } from '../../-models/events';

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
  const emit = useEmit();

  return (
    <PageHeader
      headnote={<Headnote />}
      title={t('page.loadBalancers.headerTitle')}
      rightAppend={
        <Button
          buttonStyle="outline"
          buttonColor="secondary"
          onClick={() => emit('@load-balancers/open--create', null)}
        >
          <PlusCircleIcon /> {t('common.actions.addMore')}
        </Button>
      }
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
