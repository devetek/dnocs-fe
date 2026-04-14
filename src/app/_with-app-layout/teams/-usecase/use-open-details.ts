import { useNavigate } from '@tanstack/react-router';

import useHandler from '@/shared/libs/react-hooks/useHandler';

import type { OrgDetailsPayload as Payload } from '../-rules/usecase-types';

export default function useOpenDetailsOrgUsecase() {
  const navigate = useNavigate();

  const handleUsecase = useHandler((payload: Payload) => {
    navigate({
      to: '/teams/$id',
      params: { id: payload.orgId },
    });
  });

  return [handleUsecase] as const;
}
