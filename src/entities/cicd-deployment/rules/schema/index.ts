import z from 'zod';

import { schemaOsService } from '@/entities/os-service/rules/schema';
import { SchemaCommon } from '@/entities/shared/rules/schema';

import { pointerIds, serverSnapshot, state } from './parts';

export * as CicdDeploymentParts from './parts';

export const schemaCicdDeployment = z.object({
  id: SchemaCommon.unitId,
  state,
  pointerIds,
  timestamp: SchemaCommon.timestamp,
  serverSnapshot,
  osService: schemaOsService.optional(),
});

export type CicdDeployment = z.output<typeof schemaCicdDeployment>;
