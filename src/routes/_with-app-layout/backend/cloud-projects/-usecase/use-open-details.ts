import { useCloudProjectDetailModal } from '@/features/cloud-project-detail-modal';

import useHandler from '@/shared/libs/react-hooks/useHandler';

import type { CloudProjectDetailsPayload as Payload } from '../-rules/usecase-types';

export default function useOpenDetailsUsecase() {
  const [openModal] = useCloudProjectDetailModal();

  const handleUsecase = useHandler((payload: Payload) => {
    openModal(payload);
  });

  return [handleUsecase] as const;
}
