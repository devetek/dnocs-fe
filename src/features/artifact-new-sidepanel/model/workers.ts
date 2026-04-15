import { useState } from 'react';

import { AdapterServerFromDto } from '@/entities/server/adapter';

import { ApiServer } from '@/shared/api';
import type { Dto as ServerFindDto } from '@/shared/api/server.find';
import { useAdapter } from '@/shared/libs/api-client';
import { excludeNully } from '@/shared/libs/browser/typeguards';
import buildSelector from '@/shared/libs/react-factories/buildSelector';

import { useSubscribe } from './events';

export const [WorkersModelProvider, useWorkersModel] = buildSelector(
  'WorkersModel',
)(() => {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);

  const [responseWorkers, refreshWorkers] = ApiServer.Find.useGet({
    searchQuery,
    page,
    pageSize: 3,
  });

  useSubscribe('#artifact-new-sidepanel/workers-refresh', () => {
    refreshWorkers();
  });

  const adapterWorkers = (raw: ServerFindDto) => {
    const { pagination, machines } = raw;

    return {
      pagination,
      servers: (machines ?? [])
        .map((server) => AdapterServerFromDto.toMinimal(server).okay())
        .filter(excludeNully),
    };
  };

  return {
    workers: useAdapter(responseWorkers, adapterWorkers),
    search: {
      query: searchQuery,
      setQuery: (q: string) => {
        setSearchQuery(q);
        setPage(1);
      },
    },
    pagination: {
      page,
      setPage,
    },
  };
});
