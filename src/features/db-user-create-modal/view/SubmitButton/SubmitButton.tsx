import { useAuthLoggedIn } from '@/services/auth';
import { useModalEmit } from '@/services/modal/model/event';
import { useToaster } from '@/services/toaster';

import { ApiDatabaseUser } from '@/shared/api/';
import { Button } from '@/shared/presentation/atoms/Button';
import { Spinner } from '@/shared/presentation/atoms/Spinner';

import { useDucContext } from '../../model';

export default function SubmitButton() {
  const userId = useAuthLoggedIn().userProfile.id;

  const { form, props } = useDucContext();

  const [openToaster] = useToaster();
  const emitModal = useModalEmit();

  const handleClick = form.handleSubmit(async (values) => {
    emitModal('%%modal/allow-trivial-close', false);

    const response = await ApiDatabaseUser.Create.doPost({
      dbEngine: values.engine,
      resourceId: values.resourceID,
      dbUserName: values.userInfo.username,
      dbUserPassword: values.userInfo.password,
      ownerId: userId,
      dbHost: values.connection,
    });

    if (response.$status === 'failed') {
      openToaster({
        title: (
          <>
            Error while creating database user{' '}
            <code>{values.userInfo.username}</code>
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
          Successfully created database user{' '}
          <code>{values.userInfo.username}</code>
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
