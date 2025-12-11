import { useAuthLoggedIn } from '@/services/auth';
import { useModalEmit } from '@/services/modal/model/event';
import { useToaster } from '@/services/toaster';

import { ApiDatabase } from '@/shared/api';
import { Button } from '@/shared/presentation/atoms/Button';
import { Spinner } from '@/shared/presentation/atoms/Spinner';

import { useDcContext } from '../../model';

export default function SubmitButton() {
  const userID = useAuthLoggedIn().userProfile.id;

  const { props, form } = useDcContext();

  const [openToaster] = useToaster();
  const emitModal = useModalEmit();

  const handleClick = form.handleSubmit(async (values) => {
    emitModal('%%modal/allow-trivial-close', false);

    const response = await ApiDatabase.Create.doPost({
      dbEngine: values.engine,
      resourceId: values.resourceID,
      dbName: values.dbName,
      ownerId: userID,
    });

    if (response.$status === 'failed') {
      openToaster({
        title: (
          <>
            Error while creating database with name <code>{values.dbName}</code>
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
          Successfully created database with name <code>{values.dbName}</code>
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
