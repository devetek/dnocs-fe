import { z } from 'zod';

import { SchemaCommon } from '@/entities/shared/rules/schema';

import { requestPayload, requester } from './parts';

export * as SchemaLoggingRichCaddyLbParts from './parts';

export type LoggingRichCaddyLb = z.output<typeof schemaLoggingRichCaddyLb>;
export const schemaLoggingRichCaddyLb = z.object({
  idGenerated: SchemaCommon.unitId,
  timestamp: SchemaCommon.timestamp,
  logLevel: z.enum(['info']),
  requester,
  requestPayload,
});
