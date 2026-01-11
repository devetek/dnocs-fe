import { useParams } from '@tanstack/react-router';

import { useModalEmit } from '@/services/modal/model/event';
import { useToaster } from '@/services/toaster';

import { ApiPricePackageItem } from '@/shared/api';
import { Button } from '@/shared/presentation/atoms/Button';
import { Spinner } from '@/shared/presentation/atoms/Spinner';

import { useDcContext } from '../../model';

export default function SubmitButton() {
  const { props, form } = useDcContext();
  const params = useParams({ strict: false });
  const id = params.id?.toString() || '';

  const [openToaster] = useToaster();
  const emitModal = useModalEmit();

  const handleClick = form.handleSubmit(async (values) => {
    emitModal('%%modal/allow-trivial-close', false);

    const response = await ApiPricePackageItem.Create.doPost({
      pricePackageId: id,
      priceNameId: values.priceNameID,
      limit: parseInt(values.limit),
    });

    if (response.$status === 'failed') {
      openToaster({
        title: <>Error while set service to package</>,
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
      message: <>Successfully set service to package</>,
    });

    props.onSubmitSuccess?.();
  });

  return (
    <Button onClick={handleClick}>
      {form.formState.isSubmitting ? (
        <Spinner className="text-white" />
      ) : (
        'Submit'
      )}
    </Button>
  );
}
