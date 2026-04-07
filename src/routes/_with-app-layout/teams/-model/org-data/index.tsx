import { ApiOrganizationPeople } from '@/shared/api';
import { useAdapter } from '@/shared/libs/api-client';
import buildSelector from '@/shared/libs/react-factories/buildSelector';

import { useSubscribe } from '../events';
import { useFilterModel } from '../filters';

export const [OrgDataModelProvider, useOrgDataModel] = buildSelector(
  'TeamsOrgDataModel',
)(() => {
  const { searchQuery, currentPage } = useFilterModel();

  const [response, refresh] = ApiOrganizationPeople.Find.useGet({
    name: searchQuery,
    page: currentPage,
    pageSize: 10,
  });

  useSubscribe('@teams/data--refresh', () => {
    refresh();
  });

  return {
    organizations: useAdapter(response, (raw) => ({
      list: raw.org_peoples?.flatMap((p) => (p.organization ? [p.organization] : [])) ?? [],
      pagination: raw.pagination,
    })),
    refresh,
  };
});
