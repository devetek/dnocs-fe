import { useState } from 'react';

import { useAuthLoggedIn } from '@/services/auth';

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
  const { userProfile } = useAuthLoggedIn();

  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);

  const [responseWorkersMine, refreshWorkersMine] = ApiServer.Find.useGet({
    filter: 'mine',
    userId: userProfile.id,
    searchQuery,
    page,
    pageSize: 3,
  });

  const [responseWorkersSharedWithMe, refreshWorkersSharedWithMe] =
    ApiServer.Find.useGet({
      filter: 'shared-with-me',
      userId: userProfile.id,
      searchQuery,
      page,
      pageSize: 3,
    });

  const [responseWorkersTeam, refreshWorkersTeam] = ApiServer.Find.useGet({
    filter: 'team',
    userId: userProfile.id,
    searchQuery,
    page,
    pageSize: 3,
  });

  useSubscribe('#artifact-new-sidepanel/workers-refresh', () => {
    refreshWorkersMine();
    refreshWorkersSharedWithMe();
    refreshWorkersTeam();
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
    workersMine: useAdapter(responseWorkersMine, adapterWorkers),
    workersSharedWithMe: useAdapter(
      responseWorkersSharedWithMe,
      adapterWorkers,
    ),
    workersTeam: useAdapter(responseWorkersTeam, adapterWorkers),
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
