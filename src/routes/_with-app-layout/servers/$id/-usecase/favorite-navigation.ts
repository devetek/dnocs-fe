import { useNavigate } from '@tanstack/react-router';

import useHandler from '@/shared/libs/react-hooks/useHandler';

import { useServerDataModel } from '../-model/server-data';
import type { FavoriteNavigationPayload as Payload } from '../-rules/usecase-types';

export default function useFavoriteNavigationUsecase() {
  const [serverId] = useServerDataModel((s) => [s.serverId]);

  const navigate = useNavigate();

  const handleUsecase = useHandler((payload: Payload) => {
    const { to } = payload;

    switch (to) {
      case 'modules-discover':
        navigate({
          to: '/discover/modules',
          search: {
            serverId,
          },
        });
        break;

      case 'see-more-services':
        navigate({
          to: '/servers/$id/running-services',
          params: {
            id: serverId,
          },
        });
        break;
    }
  });

  return [handleUsecase] as const;
}
