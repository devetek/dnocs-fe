import { LoaderCircleIcon } from 'lucide-react';

import { useDevetekTranslations } from '@/services/i18n';
import { cn } from '@/shared/libs/tailwind/cn';
import { Button } from '@/shared/presentation/atoms/ButtonV2';

import { useOrgEditModel } from '../../model';
import { useEmit } from '../../model/events';

export default function Actions() {
  const { isSubmitting, hasChanges } = useOrgEditModel();
  const t = useDevetekTranslations();

  const emit = useEmit();

  const handleClickSubmit = () => {
    emit('#org-edit-sidepanel/form-submit', null);
  };

  const handleClickCancel = () => {
    emit('#org-edit-sidepanel/sidepanel-close', null);
  };

  return (
    <>
      <Button
        onClick={handleClickSubmit}
        disabled={isSubmitting || !hasChanges}
      >
        {isSubmitting ? <LoaderCircleIcon className="animate-spin" /> : t('common.actions.save')}
      </Button>
      <Button
        className={cn(hasChanges && 'border-yellow-500 border-dashed')}
        buttonStyle="outline"
        buttonColor="secondary"
        onClick={handleClickCancel}
      >
        {t('common.actions.cancel')}
      </Button>
    </>
  );
}
