import { safeParseInt } from '@/shared/libs/browser/number';
import { buildQsFilterContext } from '@/shared/libs/react-factories/buildQsFilterContext';

export const [FiltersProvider, useFiltersContext] = buildQsFilterContext(
  'DiscoverModulesPageFilters',
  {
    serverID: (value) => safeParseInt(value),
    serverId: (value) => safeParseInt(value),
    serverid: (value) => safeParseInt(value),
    SERVERID: (value) => safeParseInt(value),
  },
);
