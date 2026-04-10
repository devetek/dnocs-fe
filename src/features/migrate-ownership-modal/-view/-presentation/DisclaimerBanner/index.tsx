import { MessageSquareWarningIcon } from 'lucide-react';

import { useDevetekTranslations } from '@/services/i18n';

export default function DisclaimerBanner() {
  const t = useDevetekTranslations();

  return (
    <p className="mt-4 text-xs text-primary/70 italic leading-4.5">
      <MessageSquareWarningIcon className="size-4 inline pr-1 -mt-1" />

      <strong>{t('modal.migrateOwnership.summaryTitle')}: </strong>
      <span>{t('modal.migrateOwnership.summaryMessage')}</span>
    </p>
  );
}
