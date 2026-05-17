import z from 'zod';

import { configSnapshot } from '@/entities/cicd-artifact/rules/schema/parts';
import { SchemaCommon } from '@/entities/shared/rules/schema';

import { deploymentMetadata, executor, state, timestamp } from './parts';

export * as CicdDeploymentParts from './parts';

export const schemaCicdDeployment = z.object({
  id: SchemaCommon.unitId,
  state,
  timestamp,
  executor,
  deploymentMetadata,
  configSnapshot,
});

export type CicdDeployment = z.output<typeof schemaCicdDeployment>;
