import { KeyRoundIcon, PlusCircleIcon } from 'lucide-react';

import { useDevetekTranslations } from '@/services/i18n';
import { Button } from '@/shared/presentation/atoms/ButtonV2';
import { Breadcrumb } from '@/shared/presentation/molecules/Breadcrumb';
import { PageHeader } from '@/shared/presentation/organisms/PageHeader';

import { useEmit } from '../../-model/events';

const Headnote = () => {
  return (
    <span className="flex items-center justify-between">
      <Breadcrumb
        items={[
          {
            text: 'Dashboard',
            url: '/dashboard',
          },
          {
            text: 'Backend',
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
      heroIcon={KeyRoundIcon}
      headnote={<Headnote />}
      title={t('page.sshKeys.headerTitle')}
      description={t('page.sshKeys.headerDesc')}
      rightAppend={
        <Button
          buttonStyle="outline"
          buttonColor="secondary"
          onClick={() => emit('@ssh-keys/add-new', undefined)}
        >
          <PlusCircleIcon /> {t('page.sshKeys.addKey')}
        </Button>
      }
    />
  );
}
