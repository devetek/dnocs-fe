import { useDevetekTranslations } from '@/services/i18n';

import { Button } from '@/shared/presentation/atoms/Button';
import { Spinner } from '@/shared/presentation/atoms/Spinner';
import { FailedState } from '@/widgets/failed-state';

import { useEmit } from '../../model/events';

export function Unsupported() {
  const emit = useEmit();

  const handleClickViewFileAsCode = () => {
    emit('#file-preview-sidepanel/preview-get', null);
  };

  return (
    <div className="w-full h-full flex items-center justify-center flex-col">
      <p className="text-primary mb-4">
        The following file is currently unsupported.
      </p>
      <Button onClick={handleClickViewFileAsCode}>View file as code</Button>
    </div>
  );
}

export function Loading() {
  return (
    <div className="w-full h-full flex items-center justify-center flex-col">
      <Spinner />
    </div>
  );
}

export function Failed({ errorMessage = '' }) {
  const t = useDevetekTranslations();
  const emit = useEmit();

  const handleClickRetry = () => {
    emit('#file-preview-sidepanel/preview-get', null);
  };

  return (
    <div className="w-full h-full flex items-center justify-center flex-col">
      <FailedState.WallCentered
        errorPayload={errorMessage}
        ctaText={t('common.actions.retry')}
        ctaOnClick={handleClickRetry}
      />
    </div>
  );
}
