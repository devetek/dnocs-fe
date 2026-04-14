import { buildQsFilterContext } from '@/shared/libs/react-factories/buildQsFilterContext';

export const [FilterModelProvider, useFilterModel] = buildQsFilterContext(
  'AppsFilter',
  {
    ownership: (value) => {
      switch (value) {
        case 'mine':
          return 'mine' as const;

        case 'team':
          return 'team' as const;

        default:
          return null;
      }
    },
    searchQuery: {
      qs: 'q',
      init: (value) => value || '',
    },
    pagination: {
      qs: 'page',
      init: (value) => Number(value) || 1,
    },
    viewMode: (value) => {
      switch (value) {
        case 'list':
          return 'list' as const;

        case 'grid':
          return 'grid' as const;

        default:
          return 'auto' as const;
      }
    },
  },
);
