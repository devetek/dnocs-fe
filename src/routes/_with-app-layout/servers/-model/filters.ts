import { buildQsFilterContext } from '@/shared/libs/react-factories/buildQsFilterContext';

export const [FilterModelProvider, useFilterModel] = buildQsFilterContext(
  'Filter',
  {
    ownership: (value) => {
      switch (value) {
        case 'mine':
          return 'mine' as const;

        case 'public-resource':
          return 'public-resource' as const;

        case 'team':
          return 'team' as const;

        default:
          return null;
      }
    },
    hasModules: {
      qs: 'has_modules',
      init: (value) => {
        switch (value) {
          case 'db':
            return 'db' as const;

          case 'memstore':
            return 'memstore' as const;

          default:
            return null;
        }
      },
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
