import { useMemo, useState } from 'react';

import { ApiServer } from '@/shared/api';
import { excludeNully } from '@/shared/libs/browser/typeguards';
import { buildContext } from '@/shared/libs/react-factories/buildContext';

const PAGE_SIZE = 3;

export const [ServersStoreProvider, useServersStore] = buildContext(
  'ApplicationsCreateServersStore',
  () => {
    const [page, setPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');

    const [responseServers] = ApiServer.Find.useGet({
      pageSize: PAGE_SIZE,
      page,
      searchQuery: searchQuery || undefined,
    });

    const servers = useMemo(() => {
      if (responseServers.$status !== 'success') return responseServers;

      const { machines, pagination } = responseServers;

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
        totalPage: pagination?.total_page ?? 1,
      };
    }, [responseServers]);

    return [servers, { page, setPage, searchQuery, setSearchQuery }] as const;
  },
);
