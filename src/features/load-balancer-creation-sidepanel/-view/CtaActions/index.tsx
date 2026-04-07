import { LoaderCircleIcon } from 'lucide-react';
import { useWatch } from 'react-hook-form';

import { useDevetekTranslations } from '@/services/i18n';

import { Button } from '@/shared/presentation/atoms/ButtonV2';

import { useEmit } from '../../-model/events';
import { useLbCreationForm } from '../../-model/form';

export default function CtaActions() {
  const t = useDevetekTranslations();
  const emit = useEmit();

  const form = useLbCreationForm();
  const isSubmitting = form.formState.isSubmitting;

  const lbKind = useWatch({ control: form.control, name: 'lbKind' });

  return (
    <div
      className="flex flex-col data-[expanded=true]:lg:flex data-[expanded=true]:lg:flex-row-reverse gap-2 w-full"
      data-expanded={lbKind === 'l7'}
    >
      <Button
        className="min-w-60"
        disabled={isSubmitting}
        onClick={() => emit('#load-balancer-creation-sidepanel/form-submit')}
      >
        {isSubmitting ? (
          <LoaderCircleIcon className="animate-spin" />
        ) : (
          t('common.actions.create')
        )}
      </Button>
      <Button
        className="min-w-40"
        buttonColor="secondary"
        disabled={isSubmitting}
        onClick={() =>
          emit('#load-balancer-creation-sidepanel/sidepanel-close')
        }
      >
        {t('common.actions.cancel')}
      </Button>
    </div>
  );
}
