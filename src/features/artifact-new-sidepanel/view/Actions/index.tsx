import { LoaderCircleIcon } from 'lucide-react';

import { useDevetekTranslations } from '@/services/i18n';

import { cn } from '@/shared/libs/tailwind/cn';
import { Button } from '@/shared/presentation/atoms/Button';

import { useEmit } from '../../model/events';
import { useArtifactNewGeneralModel } from '../../model/general';

export default function Actions() {
  const { isSubmitting, hasChanges } = useArtifactNewGeneralModel();

  const t = useDevetekTranslations();

  const emit = useEmit();

  const handleClickSubmit = () => {
    emit('#artifact-new-sidepanel/form-submit', null);
  };

  const handleClickCancel = () => {
    emit('#artifact-new-sidepanel/sidepanel-close', null);
  };

  const cnCancel = cn(hasChanges && 'border-yellow-500 border-dashed');

  return (
    <>
      <Button
        onClick={handleClickSubmit}
        disabled={isSubmitting || !hasChanges}
      >
        {isSubmitting ? (
          <LoaderCircleIcon className="animate-spin" />
        ) : (
          t('common.actions.save')
        )}
      </Button>
      <Button
        className={cnCancel}
        variant="outline"
        onClick={handleClickCancel}
      >
        {t('common.actions.cancel')}
      </Button>
    </>
  );
}
