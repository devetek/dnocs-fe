import { useModalEmit } from '@/services/modal/model/event';
import { useToaster } from '@/services/toaster';

import { ApiDatabaseUser } from '@/shared/api';
import { Button } from '@/shared/presentation/atoms/Button';
import { Spinner } from '@/shared/presentation/atoms/Spinner';

import { useDugContext } from '../../model';

export default function SubmitButton() {
  const {
    selectedDB,
    checkedAccess,
    accessList,
    checkWithGrantOpt,
    props,
    isMutating,
    setIsMutating,
  } = useDugContext();

  const [openToaster] = useToaster();
  const emitModal = useModalEmit();

  const canSubmit = Boolean(selectedDB);

  const handleClick = async () => {
    if (!selectedDB) return;

    setIsMutating(true);

    const checkedAll = checkedAccess.length === accessList.length;

    emitModal('%%modal/allow-trivial-close', false);

    const response = await ApiDatabaseUser.Grant.$UserId.doPost({
      userId: props.selectedUserId,
      payload: {
        dbName: selectedDB.dbName,
        privilige: checkedAll ? ['ALL'] : checkedAccess,
        userHost: props.selectedUserAccess,
        userName: props.selectedUserName,
        withGrantOption: checkWithGrantOpt,
      },
    });

    if (response.$status === 'failed') {
      openToaster({
        title: (
          <>
            Error while granting accesses for user{' '}
            <code>{props.selectedUserName}</code>
          </>
        ),
        message: response.error.message,
        variant: 'error',
        duration: 5000,
      });

      setIsMutating(false);
      emitModal('%%modal/allow-trivial-close', true);
      return;
    }

    emitModal('%%modal/close', null);

    openToaster({
      variant: 'success',
      message: (
        <>
          Successfully grants accesses for user{' '}
          <code>{props.selectedUserName}</code>
        </>
      ),
    });

    props.onSubmitSuccess?.();
  };

  return (
    <Button disabled={!canSubmit || isMutating} onClick={handleClick}>
      {isMutating ? <Spinner className="text-white" /> : 'Submit'}
    </Button>
  );
}
