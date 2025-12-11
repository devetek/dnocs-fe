import { OctagonAlertIcon, RefreshCcwIcon } from 'lucide-react';

import { useDevetekTranslations } from '@/services/i18n';

import { cn } from '@/shared/libs/tailwind/cn';

interface FailedStateBannerProps {
  classNameWrapper?: string;
  messageKind?: 'general';

  onClickRetry: () => void;
}

export default function FailedStateBannerRetryable(
  props: FailedStateBannerProps,
) {
  const { classNameWrapper, messageKind = 'general', onClickRetry } = props;

  const t = useDevetekTranslations(
    `widget.failedState.bannerRetryable.${messageKind}`,
  );

  const cnWrapper = cn(
    'bg-card border shadow-xs rounded-lg',
    'w-full min-w-[280px] px-3 py-2 grid grid-cols-[1fr_auto] gap-x-4',
    classNameWrapper,
  );

  return (
    <div className={cnWrapper}>
      <div className="flex flex-col">
        <h6 className="font-semibold text-red-500 flex items-center gap-1">
          <OctagonAlertIcon className="size-5 inline text-red-500 bg-red-50 dark:bg-red-950 p-0.5 rounded-full" />
          {t('title')}
        </h6>
        <p className="text-sm text-primary/80">{t('subtitle')}</p>
      </div>

      <div className="flex items-center">
        <button
          className="cursor-pointer p-2 rounded-full border shadow-sm hover:bg-black/5 transition-all active:rotate-180 dark:hover:bg-white/5"
          onClick={onClickRetry}
        >
          <RefreshCcwIcon />
        </button>
      </div>
    </div>
  );
}
