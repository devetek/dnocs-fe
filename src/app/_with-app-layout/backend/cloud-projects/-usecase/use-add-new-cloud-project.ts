import { useCloudProjectCreateModal } from '@/features/cloud-project-create-modal';

import useHandler from '@/shared/libs/react-hooks/useHandler';

import { useEmit } from '../-model/events';

export default function useAddNewCloudProjectUsecase() {
  const [openModal] = useCloudProjectCreateModal();
  const emit = useEmit();

  const handleUsecase = useHandler(() => {
    openModal({
      onSubmitSuccess: () => {
        emit('@cloud-projects/data--refresh', null);
      },
    });
  });

  return [handleUsecase] as const;
}
