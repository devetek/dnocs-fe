import { LoaderCircleIcon } from 'lucide-react';

import { useDevetekTranslations } from '@/services/i18n';

import { Button } from '@/shared/presentation/atoms/ButtonV2';

import { useEmit } from '../../-models/events';
import { useMigrateOwnershipForm } from '../../-models/form';

export default function CtaActions() {
  const t = useDevetekTranslations();
  const emit = useEmit();

  const form = useMigrateOwnershipForm();
  const isSubmitting = form.formState.isSubmitting;

  return (
    <div className="mt-4 flex flex-col gap-2 w-full">
      <Button
        disabled={isSubmitting}
        onClick={() => emit('#migrate-ownership-modal/form-submit')}
      >
        {isSubmitting ? (
          <LoaderCircleIcon className="animate-spin" />
        ) : (
          t('common.actions.save')
        )}
      </Button>
      <Button
        buttonColor="secondary"
        disabled={isSubmitting}
        onClick={() => emit('#migrate-ownership-modal/modal-close')}
      >
        {t('common.actions.cancel')}
      </Button>
    </div>
  );
}
