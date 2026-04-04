import { LoaderCircleIcon } from 'lucide-react';

import { useDevetekTranslations } from '@/services/i18n';

import { Button } from '@/shared/presentation/atoms/ButtonV2';

import { useEmit } from '../../-model/events';
import { useDomainRegistrationModel } from '../../-model/general';

export default function CtaActions() {
  const t = useDevetekTranslations();
  const emit = useEmit();
  const { isSubmitting } = useDomainRegistrationModel();

  return (
    <div className="flex flex-col gap-y-2">
      <Button
        disabled={isSubmitting}
        onClick={() => emit('#domain-registration-sidepanel/form-submit', null)}
      >
        {isSubmitting ? (
          <LoaderCircleIcon className="animate-spin" />
        ) : (
          t('common.actions.create')
        )}
      </Button>
      <Button
        danger
        buttonStyle="outline"
        disabled={isSubmitting}
        onClick={() => emit('#domain-registration-sidepanel/sidepanel-close', null)}
      >
        {t('common.actions.cancel')}
      </Button>
    </div>
  );
}
