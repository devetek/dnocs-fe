import { MessageSquareWarningIcon } from 'lucide-react';

import { useDevetekTranslations } from '@/services/i18n';

export default function ImmediatelyCommitOnSave() {
  const t = useDevetekTranslations();

  return (
    <p className="text-xs opacity-70 italic inline">
      <MessageSquareWarningIcon className="size-4 inline pr-1" />

      {t.rich('widget.disclaimersLabel.immediatelyCommitOnSave.message', {
        strong: (chunks) => <strong>{chunks}</strong>,
      })}
    </p>
  );
}
