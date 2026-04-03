import { useNavigate } from '@tanstack/react-router';
import { ArrowLeftIcon, HomeIcon } from 'lucide-react';

import { useDevetekTranslations } from '@/services/i18n';

import { Button } from '@/shared/presentation/atoms/ButtonV2';

export default function NotFoundView() {
  const navigate = useNavigate();
  const t = useDevetekTranslations();

  const canGoBack = typeof window !== 'undefined' && window.history.length > 1;

  function handleBack() {
    if (canGoBack) {
      window.history.back();
    } else {
      navigate({ to: '/dashboard' });
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center">
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-6">
        {/* 404 Number */}
        <div className="relative select-none">
          <span className="text-[10rem] font-black leading-none tracking-tighter text-primary/10 sm:text-[14rem]">
            404
          </span>
          <span className="absolute inset-0 flex items-center justify-center text-[3.5rem] font-black leading-none tracking-tight text-primary sm:text-[5rem]">
            404
          </span>
        </div>

        {/* Heading & description */}
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            {t('page.notFound.title')}
          </h1>
          <p className="max-w-md text-sm text-muted-foreground sm:text-base">
            {t('page.notFound.description')}
          </p>
        </div>

        {/* Action buttons */}
        <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
          <Button buttonStyle="flat" buttonColor="primary" size="lg" onClick={handleBack}>
            <ArrowLeftIcon />
            {canGoBack ? t('common.actions.back') : t('common.actions.backToDashboard')}
          </Button>

          {canGoBack && (
            <Button
              buttonStyle="outline"
              buttonColor="secondary"
              size="lg"
              onClick={() => navigate({ to: '/dashboard' })}
            >
              <HomeIcon />
              {t('sidebar.dashboard')}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
