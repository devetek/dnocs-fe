import { useMemo } from 'react';

import { ApiServer } from '@/shared/api';
import { excludeNully } from '@/shared/libs/browser/typeguards';
import { buildContext } from '@/shared/libs/react-factories/buildContext';

export const [ServersStoreProvider, useServersStore] = buildContext(
  'ApplicationsCreateServersStore',
  () => {
    const [responseServers] = ApiServer.Find.useGet({
      pageSize: 99,
    });

    const servers = useMemo(() => {
      if (responseServers.$status !== 'success') return responseServers;

      const { machines } = responseServers;

      return {
        $status: 'success' as const,
        servers: (machines ?? [])
          .map((machine) => {
            const { id, hostname, address: publicIP } = machine;

            if (!id || !hostname || !publicIP) return null;

            return {
              id,
              hostname,
              publicIP,
            };
          })
          .filter(excludeNully),
      };
    }, [responseServers]);

    return [servers] as const;
  },
);
