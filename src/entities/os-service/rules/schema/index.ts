import { z } from 'zod';

import { state } from './parts';

export * as SchemaOsServiceParts from './parts';

export type OsService = z.infer<typeof schemaOsService>;
export const schemaOsService = z.object({
  serviceName: z.string(),
  serviceState: state,
});
