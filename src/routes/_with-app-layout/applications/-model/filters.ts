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
    bundleType: (value) => {
      switch (value) {
        case 'all':
          return 'all' as const;

        case 'wordpress':
          return 'wordpress' as const;

        case 'laravel':
          return 'laravel' as const;

        default:
          return null;
      }
    },
    sourceType: (value) => {
      switch (value) {
        case 'all':
          return 'all' as const;

        case 'github':
          return 'github' as const;

        case 'no-source':
          return 'no-source' as const;

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
  },
);
