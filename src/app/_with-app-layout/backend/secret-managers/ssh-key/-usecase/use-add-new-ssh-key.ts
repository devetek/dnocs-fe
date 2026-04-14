import { useSSHKeyCreateModal } from '@/features/ssh-create-modal';

import useHandler from '@/shared/libs/react-hooks/useHandler';

import { useEmit } from '../-model/events';

export default function useAddNewSshKeyUsecase() {
  const [openModal] = useSSHKeyCreateModal();
  const emit = useEmit();

  const handleUsecase = useHandler(() => {
    openModal({
      onSubmitSuccess: () => {
        emit('@ssh-keys/data--refresh', null);
      },
    });
  });

  return [handleUsecase] as const;
}
