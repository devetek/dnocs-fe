import { buildQsFilterContext } from '@/shared/libs/react-factories/buildQsFilterContext';

export const [FilterProvider, useFilter] = buildQsFilterContext('Filter', {
  pagination: {
    qs: 'page',
    init: (value) => Number(value) || 1,
  },
});
