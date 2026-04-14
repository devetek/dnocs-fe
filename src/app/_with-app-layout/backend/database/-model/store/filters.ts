import { buildQsFilterContext } from '@/shared/libs/react-factories/buildQsFilterContext';

export const [FiltersProvider, useFilters] = buildQsFilterContext('Filter', {
  view: (value) => (value === 'user' ? 'user' : 'db'),
  engineType: {
    qs: 'engine',
    init: (value) => value || 'all',
  },
  searchQuery: {
    qs: 'q',
    init: (value) => value || '',
  },
  pagination: {
    qs: 'page',
    init: (value) => Number(value) || 1,
  },
});
