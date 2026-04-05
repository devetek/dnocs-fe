import { PlusCircleIcon, UsersIcon } from 'lucide-react';

import { useDevetekTranslations } from '@/services/i18n';
import { Button } from '@/shared/presentation/atoms/ButtonV2';
import { Breadcrumb } from '@/shared/presentation/molecules/Breadcrumb';
import { PageHeader } from '@/shared/presentation/organisms/PageHeader';

import { useEmit } from '../../-model/events';

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
        ]}
      />
    </span>
  );
};

export default function Header() {
  const emit = useEmit();
  const t = useDevetekTranslations();

  return (
    <PageHeader
      heroIcon={UsersIcon}
      headnote={<Headnote />}
      title={t('page.teams.headerTitle')}
      description={t('page.teams.headerDesc')}
      rightAppend={
        <Button
          buttonStyle="outline"
          buttonColor="secondary"
          onClick={() => emit('@teams/add-new', undefined)}
        >
          <PlusCircleIcon /> {t('page.teams.addTeam')}
        </Button>
      }
    />
  );
}
