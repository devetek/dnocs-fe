import { useNavigate } from '@tanstack/react-router';
import { PlusCircleIcon } from 'lucide-react';

import { useAuthLoggedIn } from '@/services/auth';
import { useDevetekTranslations } from '@/services/i18n';

import { Button } from '@/shared/presentation/atoms/Button';
import { Breadcrumb } from '@/shared/presentation/molecules/Breadcrumb';
import { PageHeader } from '@/shared/presentation/organisms/PageHeader';

import { useEmit } from '../../-model/events';

const Headnote = () => {
  const t = useDevetekTranslations();

  const emit = useEmit();

  const { gitProfile } = useAuthLoggedIn();

  const handleClickLoginGithub = () => {
    emit('@applications/github-login', null);
  };

  return (
    <span className="flex items-center justify-between">
      <Breadcrumb
        items={[
          {
            text: t('sidebar.dashboard'),
            url: '/dashboard',
          },
        ]}
      />

      <span className="flex items-center gap-4">
        {!gitProfile && (
          <a className="cursor-pointer" onClick={handleClickLoginGithub}>
            Login Github
          </a>
        )}
      </span>
    </span>
  );
};

export default function Header() {
  const t = useDevetekTranslations();

  const navigate = useNavigate();

  const handleClickAddMore = () => {
    navigate({
      to: '/applications/create',
    });
  };

  return (
    <PageHeader
      headnote={<Headnote />}
      title={t('page.applications.headerTitle')}
      rightAppend={
        <Button variant="outline" onClick={handleClickAddMore}>
          <PlusCircleIcon /> {t('common.actions.addMore')}
        </Button>
      }
      description={t('page.applications.headerDesc')}
      footnote={t.rich('page.applications.headerFootnote', {
        a: (chunks) => (
          <a className="underline" href="//www.youtube.com/@dpanel_id">
            {chunks}
          </a>
        ),
        i: (chunks) => <span className="italic">{chunks}</span>,
      })}
    />
  );
}
