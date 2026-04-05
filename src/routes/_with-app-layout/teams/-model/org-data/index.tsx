import { ApiOrganization } from '@/shared/api';
import { useAdapter } from '@/shared/libs/api-client';
import buildSelector from '@/shared/libs/react-factories/buildSelector';

import { useSubscribe } from '../events';
import { useFilterModel } from '../filters';

export const [OrgDataModelProvider, useOrgDataModel] = buildSelector(
  'TeamsOrgDataModel',
)(() => {
  const { searchQuery, currentPage } = useFilterModel();

  const [response, refresh] = ApiOrganization.Find.useGet({
    name: searchQuery,
    page: currentPage,
    pageSize: 10,
  });

  useSubscribe('@teams/data--refresh', () => {
    refresh();
  });

  return {
    organizations: useAdapter(response, (raw) => ({
      list: raw.organizations ?? [],
      pagination: raw.pagination,
    })),
    refresh,
  };
});
