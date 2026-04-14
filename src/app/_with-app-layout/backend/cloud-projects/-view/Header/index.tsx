import { CloudIcon, PlusCircleIcon } from 'lucide-react';

import { useDevetekTranslations } from '@/services/i18n';
import { Button } from '@/shared/presentation/atoms/ButtonV2';
import { Breadcrumb } from '@/shared/presentation/molecules/Breadcrumb';
import { PageHeader } from '@/shared/presentation/organisms/PageHeader';

import { useEmit } from '../../-model/events';

const Headnote = () => (
  <span className="flex items-center justify-between">
    <Breadcrumb
      items={[
        { text: 'Dashboard', url: '/dashboard' },
        { text: 'Backend' },
      ]}
    />
  </span>
);

export default function Header() {
  const emit = useEmit();
  const t = useDevetekTranslations();

  return (
    <PageHeader
      heroIcon={CloudIcon}
      headnote={<Headnote />}
      title={t('page.cloudProjects.headerTitle')}
      description={t('page.cloudProjects.headerDesc')}
      footnote={
        <>
          Supported providers: <strong>IDCloudHost</strong>,{' '}
          <strong>Google Cloud Platform</strong>, and{' '}
          <strong>Proxmox VE</strong>. More providers coming soon. Visit our{' '}
          <a className="underline" href="//www.youtube.com/@dpanel_id">
            YouTube channel
          </a>{' '}
          for a step-by-step tutorial.
        </>
      }
      rightAppend={
        <Button
          buttonStyle="outline"
          buttonColor="secondary"
          onClick={() => emit('@cloud-projects/add-new', undefined)}
        >
          <PlusCircleIcon /> {t('page.cloudProjects.connectAccount')}
        </Button>
      }
    />
  );
}
