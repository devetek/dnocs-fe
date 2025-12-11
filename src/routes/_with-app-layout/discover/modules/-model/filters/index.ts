import { safeParseInt } from '@/shared/libs/browser/number';
import { buildQsFilterContext } from '@/shared/libs/react-factories/buildQsFilterContext';

export const [FiltersProvider, useFiltersContext] = buildQsFilterContext(
  'DiscoverModulesPageFilters',
  {
    serverID: (value) => safeParseInt(value),
  },
);
