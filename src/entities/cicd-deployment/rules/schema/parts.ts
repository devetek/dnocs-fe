import dayjs from 'dayjs';
import { z } from 'zod';

import { SchemaCicdArtifactParts } from '@/entities/cicd-artifact/rules/schema';
import { schemaOsService } from '@/entities/os-service/rules/schema';
import { schemaServerMinimal } from '@/entities/server/rules/schema';
import { SchemaAppConfig, SchemaCommon } from '@/entities/shared/rules/schema';

export type State = z.output<typeof state>;
export const state = SchemaCommon.createState(
  [
    'pending',
    'ready',
    'progress',
    'failed',
    'deleted',
    'cancelled',
    'deleting',
    'unknown',
  ],
  'unknown',
);

export type Executor = z.output<typeof executor>;
export const executor = z.object({
  userName: z.string(),
});

export type Timestamp = z.output<typeof timestamp>;
export const timestamp = SchemaCommon.timestamp.transform((ts) => {
  const { created, updated } = ts;

  return {
    created,
    updated,
    buildTimeInSeconds: dayjs(updated).diff(created, 'second'),
  };
});

export type DeploymentArtifact = z.output<typeof deploymentArtifact>;
export const deploymentArtifact = z.object({
  id: SchemaCommon.unitId,
  commitMetadata: SchemaCicdArtifactParts.commitMetadata,
});

export type ConfigSnapshot = z.output<typeof configSnapshot>;
export const configSnapshot = z.object({
  lifecycle: SchemaAppConfig.lifecycle,
});

export type DeploymentMetadata = z.output<typeof deploymentMetadata>;
export const deploymentMetadata = z.object({
  targetAppId: SchemaCommon.unitId,
  artifact: z.object({
    id: SchemaCommon.unitId,
    commitMetadata: SchemaCicdArtifactParts.commitMetadata,
  }),
  server: schemaServerMinimal,
  osService: schemaOsService.optional(),
});
