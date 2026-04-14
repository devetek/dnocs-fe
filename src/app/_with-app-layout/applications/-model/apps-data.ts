import { useAuthLoggedIn } from '@/services/auth';

import { AdapterApplicationFromDto } from '@/entities/application/adapter';

import { ApiApplication } from '@/shared/api';
import { useAdapter } from '@/shared/libs/api-client';
import buildSelector from '@/shared/libs/react-factories/buildSelector';

import { useSubscribe } from './events';
import { useFilterModel } from './filters';

export const [AppsDataModelProvider, useAppsDataModel] = buildSelector(
  'AppsDataModel',
)(() => {
  const { userProfile } = useAuthLoggedIn();

  const { pagination, searchQuery, ownership } =
    useFilterModel();

  const [response, refresh] = ApiApplication.Find.useGet({
    page: pagination,
    limit: 4,
    name: searchQuery,
    forceMine: ownership === 'mine' ? 'true' : undefined,
    userId: ownership === 'mine' ? userProfile.id : undefined,
  });

  useSubscribe('@applications/application-refresh', () => refresh());

  return {
    applications: useAdapter(response, (raw) => {
      const parsed = (raw.applications || []).map((application) =>
        AdapterApplicationFromDto.toApplicationCard(application).unwrap(),
      );

      return {
        list: parsed,
        pagination: raw.pagination,
      };
    }),
  };
});
