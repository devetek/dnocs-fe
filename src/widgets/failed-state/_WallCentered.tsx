import {
  ExternalLinkIcon,
  OctagonAlertIcon,
  RefreshCcwIcon,
} from 'lucide-react';

import { useDevetekTranslations } from '@/services/i18n';

import { cn } from '@/shared/libs/tailwind/cn';
import { Button } from '@/shared/presentation/atoms/Button';

import { REPORT_CONTACT_EMAIL } from './config';
import type {
  FailedStateWallCenteredProps as Props,
  FailedStateWallCenteredRetryableProps as RetryableProps,
} from './types';

export default function FailedStateWallCentered(props: Props) {
  const {
    classNameWrapper,
    classNameErrorPayload,
    errorPayload,
    withCard,
    ctaText,
    ctaOnClick,
  } = props;

  const t = useDevetekTranslations('widget.failedState.wallCentered');

  const cnWrapper = cn(
    'w-full min-w-[280px] flex flex-col items-center justify-center',
    withCard && 'px-5 py-4 bg-card border rounded-2xl shadow-lg',
    classNameWrapper,
  );

  const cnErrorPayloadWrapper = cn(
    'mt-4 bg-black max-w-80 sm:max-w-100 lg:max-w-160 overflow-hidden rounded-lg text-white',
    classNameErrorPayload,
  );

  return (
    <div className={cnWrapper}>
      <div className="p-1 rounded-full bg-red-50 dark:bg-red-950/30">
        <OctagonAlertIcon className="size-12 text-red-500" />
      </div>

      <p className="mt-2 text-lg text-red-500 font-bold text-center">
        {t('title')}
      </p>

      <p className="mt-2 text-center text-primary/70">
        {t.rich(errorPayload ? 'subtitleHasPayload' : 'subtitleNoPayload', {
          contact: () => (
            <>
              <a
                className="cursor-pointer hover:underline inline-flex items-center gap-1"
                href={`mailto: ${REPORT_CONTACT_EMAIL}`}
              >
                {REPORT_CONTACT_EMAIL}

                <ExternalLinkIcon className="size-3" />
              </a>
              <br />
            </>
          ),
        })}
      </p>

      {errorPayload && (
        <div className={cnErrorPayloadWrapper}>
          <div className="px-4 py-2 max-h-40 w-full overflow-auto">
            <pre className="text-xs">{errorPayload}</pre>
          </div>
        </div>
      )}

      {ctaText && ctaOnClick && (
        <Button className="mt-3" onClick={ctaOnClick}>
          {ctaText}
        </Button>
      )}
    </div>
  );
}

FailedStateWallCentered.Retryable = function Retryable(props: RetryableProps) {
  const { onClickRetry, ...rest } = props;

  const t = useDevetekTranslations();

  return (
    <FailedStateWallCentered
      {...rest}
      ctaText={
        <span className="flex items-center gap-1">
          <RefreshCcwIcon /> {t('common.actions.retry')}
        </span>
      }
      ctaOnClick={onClickRetry}
    />
  );
};
