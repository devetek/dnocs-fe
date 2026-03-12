import { useAuthLoggedIn } from '@/services/auth';

import { AdapterApplicationFromDto } from '@/entities/application/adapter';
import { POLL_INTERVAL_MS__LIST } from '@/entities/server/config';

import { ApiApplication } from '@/shared/api';
import { useAdapter } from '@/shared/libs/api-client';
import { iife } from '@/shared/libs/browser/fn';
import buildSelector from '@/shared/libs/react-factories/buildSelector';

import { useSubscribe } from './events';
import { useFilterModel } from './filters';

export const [AppsDataModelProvider, useAppsDataModel] = buildSelector(
  'AppsDataModel',
)(() => {
  const { userProfile } = useAuthLoggedIn();

  const { pagination, searchQuery, bundleType, sourceType, ownership } =
    useFilterModel();

  const [response, refresh] = ApiApplication.Find.useGet({
    page: pagination,
    limit: 4,
    name: searchQuery,
    source: iife(() => {
      switch (true) {
        case sourceType === 'github':
          return 'github';

        case bundleType === 'laravel':
          return 'laravel';

        case bundleType === 'wordpress':
          return 'wordpress';
      }
    }),
    forceMine: ownership === 'mine' ? 'true' : undefined,
    userId: ownership === 'mine' ? userProfile.id : undefined,
    options: {
      refreshIntervalMs: POLL_INTERVAL_MS__LIST,
    }
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
