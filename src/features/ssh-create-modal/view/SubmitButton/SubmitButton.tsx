import { useAuthLoggedIn } from '@/services/auth';
import { useModalEmit } from '@/services/modal/model/event';
import { useToaster } from '@/services/toaster';

import { ApiSecret } from '@/shared/api';
import { Button } from '@/shared/presentation/atoms/Button';
import { Spinner } from '@/shared/presentation/atoms/Spinner';

import { useSSHCreateContext } from '../../model';

export default function SubmitButton() {
  const userId = useAuthLoggedIn().userProfile.id;

  const { displayName, keyLength, props, isMutating, setIsMutating } =
    useSSHCreateContext();

  const [openToaster] = useToaster();
  const emitModal = useModalEmit();

  const canSubmit = displayName && keyLength;

  const handleClick = async () => {
    if (!displayName || !keyLength) return;

    setIsMutating(true);
    emitModal('%%modal/allow-trivial-close', false);

    const response = await ApiSecret.SshKey.Create.doPost({
      keyLength,
      displayName,
      userId,
    });

    if (response.$status === 'failed') {
      openToaster({
        title: (
          <>
            Error while creating SSH key with name <code>{displayName}</code>
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
          Successfully created SSH key with name <code>{displayName}</code>
        </>
      ),
    });

    props.onSubmitSuccess?.();
  };

  return (
    <Button
      className="w-full"
      disabled={!canSubmit || isMutating}
      onClick={handleClick}
    >
      {isMutating ? <Spinner className="text-white" /> : 'Generate SSH Key'}
    </Button>
  );
}
