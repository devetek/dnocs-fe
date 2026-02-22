import { z } from 'zod';

import { FilterRules } from '.';

export const schemaQueryString = z.object({
  q: FilterRules.schemaSearchQuery,
  page: FilterRules.schemaCurrentPage,
  viewMode: z
    .preprocess(
      (val) => (!val ? 'auto' : val),
      FilterRules.schemaViewMode.default('auto'),
    )
    .optional(),
});

export type QueryString = z.output<typeof schemaQueryString>;

export const keysOfQueryString = schemaQueryString.keyof().options;
