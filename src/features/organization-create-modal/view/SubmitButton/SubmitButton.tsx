import { LoaderCircleIcon } from 'lucide-react';

import { useModalEmit } from '@/services/modal/model/event';
import { useToaster } from '@/services/toaster';
import { useDevetekTranslations } from '@/services/i18n';

import { ApiOrganization } from '@/shared/api';
import { Button } from '@/shared/presentation/atoms/ButtonV2';

import { useDcContext } from '../../model';

export default function SubmitButton() {
  const { props, form } = useDcContext();

  const [openToaster] = useToaster();
  const emitModal = useModalEmit();
  const t = useDevetekTranslations();

  const handleClick = form.handleSubmit(async (values) => {
    emitModal('%%modal/allow-trivial-close', false);

    const response = await ApiOrganization.Create.doPost({
      organizationName: values.name,
      userId: values.user_id,
      description: values.description,
    });

    if (response.$status === 'failed') {
      openToaster({
        title: t('modal.createTeam.toaster.error', { name: values.name }),
        message: response.error.message,
        variant: 'error',
        duration: 5000,
      });

      emitModal('%%modal/allow-trivial-close', true);
      return;
    }

    emitModal('%%modal/close', null);

    openToaster({
      variant: 'success',
      message: t('modal.createTeam.toaster.success', { name: values.name }),
    });

    props.onSubmitSuccess?.();
  });

  const isSubmitting = form.formState.isSubmitting;

  return (
    <Button
      className="w-full"
      onClick={handleClick}
      disabled={isSubmitting}
    >
      {isSubmitting ? (
        <LoaderCircleIcon className="animate-spin" />
      ) : (
        t('modal.createTeam.submit')
      )}
    </Button>
  );
}
