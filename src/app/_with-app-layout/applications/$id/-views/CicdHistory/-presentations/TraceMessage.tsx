import { MessageSquareWarningIcon } from 'lucide-react';

import { useDevetekTranslations } from '@/services/i18n';

import { injectDynStyles } from '@/entities/res-state/ui/constants/config';
import '@/shared/libs/browser/string';

import type { ResStateStatus } from '@/entities/res-state/rules/schema';

interface Props {
  status: ResStateStatus;
  message: string;
  onSeeMore?: () => void;
  className?: string;
}

export default function TraceMessage(props: Props) {
  const { status, message, onSeeMore, className } = props;
  const t = useDevetekTranslations();

  return (
    <div className={`flex flex-col ${className}`}>
      <p className="uppercase text-2xs font-semibold text-muted-foreground tracking-wider flex items-center gap-x-0.5">
        <MessageSquareWarningIcon className="size-2.5" /> Trace Message
      </p>
      <p className="mt-0.5 text-sm" style={injectDynStyles(null, status)}>
        <span className="font-roboto-mono tracking-tighter text-(--color-hero)">
          {message.truncate(80)}
        </span>
        {onSeeMore && (
          <>
            &nbsp;
            <button
              type="button"
              className="text-accent font-medium cursor-pointer"
              onClick={onSeeMore}
            >
              {t('common.actions.seeMore')}
            </button>
          </>
        )}
      </p>
    </div>
  );
}
