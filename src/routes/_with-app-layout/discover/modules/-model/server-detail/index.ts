import { useMemo } from 'react';

import { AdapterServerFromDto } from '@/entities/server/adapter';

import { ApiServer } from '@/shared/api';
import { buildContext } from '@/shared/libs/react-factories/buildContext';

import { useFiltersContext } from '../filters';

export const [ServerDetailProvider, useServerDetailContext] = buildContext(
  'DiscoverModulesPageServerDetail',
  () => {
    const { serverID, serverId, serverid, SERVERID } = useFiltersContext();
    const serverIDToUse = serverID ?? serverId ?? serverid ?? SERVERID;

    const [response, mutate] = ApiServer.Detail.$Id.useGet({
      serverId: String(serverIDToUse),
    });

    const serverDetail = useMemo(() => {
      if (response.$status !== 'success') return response;

      const parsedResponse = AdapterServerFromDto.toServerDetail(response);

      if (!parsedResponse.ok) {
        return {
          $status: 'failed' as const,
          kind: 'general-error',
          error: parsedResponse.error,
        };
      }

      return {
        $status: 'success' as const,
        ...parsedResponse.data,
      };
    }, [response]);

    return {
      serverDetail,
      mutate,
    };
  },
);
