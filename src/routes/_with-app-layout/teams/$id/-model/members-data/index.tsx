import { ApiOrganizationPeople } from '@/shared/api';
import { useAdapter } from '@/shared/libs/api-client';
import buildSelector from '@/shared/libs/react-factories/buildSelector';

import { useSubscribe } from '../events';
import { useFilterModel } from '../filters';

export const [MembersDataModelProvider, useMembersDataModel] = buildSelector(
  'TeamsMembersDataModel',
)((props: { orgId: string }) => {
  const { orgId } = props;
  const { currentPage } = useFilterModel();

  const [response, refresh] = ApiOrganizationPeople.Find.useGet({
    organizationId: orgId,
    page: currentPage,
    pageSize: 10,
  });

  useSubscribe('@team-members/data--refresh', () => {
    refresh();
  });

  return {
    members: useAdapter(response, (raw) => ({
      list: raw.org_peoples ?? [],
      pagination: raw.pagination,
      orgName: raw.org_peoples?.[0]?.organization?.name ?? null,
      orgDescription: raw.org_peoples?.[0]?.organization?.description ?? null,
    })),
    orgId,
    refresh,
  };
});
