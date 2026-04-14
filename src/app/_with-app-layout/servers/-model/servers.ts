import { useAuthLoggedIn } from '@/services/auth';

import { AdapterServerFromDto } from '@/entities/server/adapter';

import { ApiServer } from '@/shared/api';
import { useAdapter } from '@/shared/libs/api-client';
import buildSelector from '@/shared/libs/react-factories/buildSelector';

import { useSubscribe } from './events';
import { useFilterModel } from './filters';

export const [ServersModelProvider, useServersModel] = buildSelector(
  'ServersModel',
)(() => {
  const { id: userId } = useAuthLoggedIn().userProfile;

  const { pagination, ownership, hasModules, searchQuery } = useFilterModel();

  const [responseServers, refresh] = ApiServer.Find.useGet({
    filter: ownership,
    hasModules,
    userId,
    pageSize: 4,
    page: pagination,
    searchQuery,
  });

  useSubscribe('@resources::servers/servers-refresh', () => refresh());

  return {
    ...useAdapter(responseServers, (raw) => {
      const { pagination: rawPagination, machines } = raw;

      return {
        pagination: rawPagination,
        servers: (machines ?? []).map((server) =>
          AdapterServerFromDto.toServerCard(server).unwrap(),
        ),
      };
    }),
  };
});
