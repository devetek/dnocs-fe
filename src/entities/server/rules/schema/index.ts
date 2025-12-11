import { z } from 'zod';

import { SchemaCommon } from '@/entities/shared/rules/schema';

import { agent, cloud, specs, ssh, state, system } from './parts';

export * as SchemaServerParts from './parts';

export type ServerMinimal = z.infer<typeof schemaServerMinimal>;
export const schemaServerMinimal = z.object({
  id: SchemaCommon.unitId,
  hostname: z.string(),
});

export type ServerCard = z.infer<typeof schemaServerCard>;
export const schemaServerCard = z.object({
  id: SchemaCommon.unitId,
  timestamp: SchemaCommon.timestamp,
  ownership: SchemaCommon.ownership,
  cloud: cloud.optional(),
  host: z.object({
    name: z.string().optional(),
    address: z.string(),
  }),
  state,
  ssh,
  system,
  agent,
});

export type ServerDetail = z.infer<typeof schemaServerDetail>;
export const schemaServerDetail = z.object({
  id: SchemaCommon.unitId,
  timestamp: SchemaCommon.timestamp,
  ownership: SchemaCommon.ownership,
  cloud: cloud.optional(),
  host: z.object({
    name: z.string(),
    address: z.string(),
  }),
  state,
  ssh,
  system,
  agent,
  secret: z.object({
    id: SchemaCommon.unitId,
  }),
  specs,
});
