import { ZapIcon } from 'lucide-react';

import { useDevetekTranslations } from '@/services/i18n';

import CardSectionTitled from '@/shared/presentation/molecules/CardSectionTitled';

export default function QuickActions() {
  const t = useDevetekTranslations();

  return (
    <CardSectionTitled
      title={t('common.terms.quickActions')}
      icon={ZapIcon}
      placement="aside"
    >
      <>Hello</>
    </CardSectionTitled>
  );
}
