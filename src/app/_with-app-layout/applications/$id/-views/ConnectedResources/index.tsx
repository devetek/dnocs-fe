import { UnplugIcon } from 'lucide-react';

import { useDevetekTranslations } from '@/services/i18n';

import CardSectionTitled from '@/shared/presentation/molecules/CardSectionTitled';

export default function ConnectedResources() {
  const t = useDevetekTranslations();

  return (
    <CardSectionTitled
      title={t('page.applicationDetail.connectedResources.title')}
      isCollapsible
      icon={UnplugIcon}
      placement="aside"
    >
      <>Hello</>
    </CardSectionTitled>
  );
}
