import { useModalEmit } from '@/services/modal/model/event';
import { useToaster } from '@/services/toaster';

import { ApiPriceName } from '@/shared/api';
import { Button } from '@/shared/presentation/atoms/Button';
import { Spinner } from '@/shared/presentation/atoms/Spinner';

import { useDcContext } from '../../model';

export default function SubmitButton() {
  const { props, form } = useDcContext();

  const [openToaster] = useToaster();
  const emitModal = useModalEmit();

  const handleClick = form.handleSubmit(async (values) => {
    emitModal('%%modal/allow-trivial-close', false);

    const response = await ApiPriceName.Create.doPost({
      name: values.name,
    });

    if (response.$status === 'failed') {
      openToaster({
        title: (
          <>
            Error while creating price with name <code>{values.name}</code>
          </>
        ),
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
      message: (
        <>
          Successfully created price with name <code>{values.name}</code>
        </>
      ),
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
