import { LoaderCircleIcon } from 'lucide-react';

import { useDevetekTranslations } from '@/services/i18n';

import { cn } from '@/shared/libs/tailwind/cn';
import { Button } from '@/shared/presentation/atoms/Button';

import { useApplicationSetupEditModel } from '../../model';
import { useEmit } from '../../model/events';

export default function Actions() {
  const { isSubmitting, hasChanges } = useApplicationSetupEditModel();

  const t = useDevetekTranslations();

  const emit = useEmit();

  const handleClickSubmit = () => {
    emit('#application-setup-edit-sidepanel/form-submit', null);
  };

  const handleClickCancel = () => {
    emit('#application-setup-edit-sidepanel/sidepanel-close', null);
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
      <Button className={cnCancel} variant="outline" onClick={handleClickCancel}>
        {t('common.actions.cancel')}
      </Button>
    </>
  );
}
