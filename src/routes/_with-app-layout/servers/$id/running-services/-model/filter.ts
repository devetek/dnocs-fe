import { buildQsFilterContext } from '@/shared/libs/react-factories/buildQsFilterContext';

export const [FilterModelProvider, useFilterModel] = buildQsFilterContext(
  'FilterModel',
  {
    searchQuery: {
      qs: 'q',
      init: (value) => value || '',
    },
    pagination: {
      qs: 'page',
      init: (value) => Number(value) || 1,
    },
  },
);
