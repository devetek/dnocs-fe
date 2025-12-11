import { useNavigate } from '@tanstack/react-router';
import { PlusCircleIcon } from 'lucide-react';

import { useDevetekTranslations } from '@/services/i18n';

import { Button } from '@/shared/presentation/atoms/Button';
import { Breadcrumb } from '@/shared/presentation/molecules/Breadcrumb';
import { PageHeader } from '@/shared/presentation/organisms/PageHeader';

export default function Header() {
  const t = useDevetekTranslations();

  const navigate = useNavigate();

  const handleClickAddMore = () => {
    navigate({
      to: '/servers/create',
    });
  };

  return (
    <PageHeader
      headnote={
        <Breadcrumb
          items={[
            {
              text: t('sidebar.dashboard'),
              url: '/dashboard',
            },
          ]}
        />
      }
      title={t('page.servers.headerTitle')}
      rightAppend={
        <Button variant="outline" onClick={handleClickAddMore}>
          <PlusCircleIcon /> {t('common.actions.addMore')}
        </Button>
      }
      description={t('page.servers.headerDesc')}
      footnote={t.rich('page.servers.headerFootnote', {
        code: (chunks) => <code>{chunks}</code>,
        a: (chunks) => (
          <a className="underline" href="//www.youtube.com/@dpanel_id">
            {chunks}
          </a>
        ),
      })}
    />
  );
}
