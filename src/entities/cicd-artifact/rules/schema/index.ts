import z from 'zod';

import { SchemaCommon } from '@/entities/shared/rules/schema';

import {
  commitMetadata,
  configSnapshot,
  executor,
  pointerIds,
  state,
  timestamp,
} from './parts';

export * as SchemaCicdArtifactParts from './parts';

export type CicdArtifact = z.output<typeof schemaCicdArtifact>;
export const schemaCicdArtifact = z.object({
  id: SchemaCommon.unitId,
  state,
  executor,
  pointerIds,
  commitMetadata,
  configSnapshot,
  timestamp,
});
