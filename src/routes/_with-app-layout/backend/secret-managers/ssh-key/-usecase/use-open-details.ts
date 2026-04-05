import { useNavigate } from '@tanstack/react-router';

import useHandler from '@/shared/libs/react-hooks/useHandler';

import type { SshKeyDetailsPayload as Payload } from '../-rules/usecase-types';

export default function useOpenDetailsSshKeyUsecase() {
  const navigate = useNavigate();

  const handleUsecase = useHandler((payload: Payload) => {
    navigate({
      to: '/backend/secret-managers/ssh-key/$id',
      params: { id: String(payload.sshKeyId) },
    });
  });

  return [handleUsecase] as const;
}
