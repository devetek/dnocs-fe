import { useAuthLoggedIn } from '@/services/auth/usecase';

import { ApiOrganizationPeople } from '@/shared/api';
import { useAdapter } from '@/shared/libs/api-client';
import buildSelector from '@/shared/libs/react-factories/buildSelector';

import { useSubscribe } from './events';

export const [ResourcesModelProvider, useResourcesModel] = buildSelector(
  'MigrateOwnershipResourcesModel',
)(() => {
  const { userProfile } = useAuthLoggedIn();

  const [responseTeams, refreshTeams] = ApiOrganizationPeople.Find.useGet({
    page: 1,
    pageSize: 100,
    userId: userProfile.id,
  });

  useSubscribe(
    '#migrate-ownership-modal/resources/teams-refresh',
    refreshTeams,
  );

  return {
    teams: useAdapter(responseTeams, (raw) => {
      return (raw.org_peoples ?? []).map((org) => {
        const { organization, organization_id } = org;

        return {
          name: organization!.name!,
          id: organization_id!,
        };
      });
    }),
  };
});
