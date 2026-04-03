import { buildQsFilterContext } from '@/shared/libs/react-factories/buildQsFilterContext';

export const [FilterProvider, useFilter] = buildQsFilterContext('Filter', {
  searchQuery: {
    qs: 'q',
    init: (value) => value || '',
  },
  pagination: {
    qs: 'page',
    init: (value) => Number(value) || 1,
  },
  viewMode: {
    qs: 'viewMode',
    init: (value): 'auto' | 'list' | 'grid' => {
      if (value === 'list' || value === 'grid') return value;
      return 'auto';
    },
  },
});
