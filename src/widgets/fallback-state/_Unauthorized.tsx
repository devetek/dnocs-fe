import { ShieldAlertIcon } from 'lucide-react';

import { useDevetekTranslations } from '@/services/i18n';

import { cn } from '@/shared/libs/tailwind/cn';
import { Button } from '@/shared/presentation/atoms/Button';

import type { UnauthorizedProps as Props } from './types';

export default function FallbackStateUnauthorized(props: Props) {
  const { classNameWrapper, withCard, ctaLabel, ctaOnClick } = props;

  const t = useDevetekTranslations('widget.fallbackState.genericUnauthorized');

  const cnWrapper = cn(
    'w-full min-w-[280px] flex flex-col items-center justify-center',
    withCard && 'p-5 bg-card border rounded-2xl shadow-lg',
    classNameWrapper,
  );

  return (
    <div className={cnWrapper}>
      <div className="p-1 rounded-full bg-red-50 dark:bg-red-950/30">
        <ShieldAlertIcon className="size-12 text-red-500" />
      </div>

      <p className="mt-2 text-lg text-red-500 font-bold text-center">
        {t('title')}
      </p>

      <p className="mt-2 text-center text-primary/70">{t('subtitle')}</p>

      {ctaLabel && ctaOnClick && (
        <Button className="mt-5" onClick={ctaOnClick}>
          {ctaLabel}
        </Button>
      )}
    </div>
  );
}
