import { z } from 'zod';

import { SchemaCicdArtifactParts } from '@/entities/cicd-artifact/rules/schema';
import { SchemaOsServiceParts } from '@/entities/os-service/rules/schema';
import { SchemaAppConfig } from '@/entities/shared/rules/schema';

export type BundleType = z.infer<typeof bundleType>;
export const bundleType = z
  .enum(['wordpress', 'laravel', 'unknown'])
  .default('unknown');

export type Identity = z.infer<typeof identity>;
export const identity = z.intersection(
  z.object({
    name: z.string(),
    bundleType: bundleType,
  }),
  z.discriminatedUnion('source', [
    z.object({
      source: z.literal('independent'),
    }),
    z.object({
      source: z.literal('repository'),
      sourceKind: z.enum(['github']),
      repoName: z.string(),
      repoOrganization: z.string(),
    }),
  ]),
);

export type ConfigDefs = z.infer<typeof configDefs>;
export const configDefs = z.object({
  cicd: SchemaAppConfig.cicd,
  lifecycle: SchemaAppConfig.lifecycle.optional(),
});

export type State = z.infer<typeof state>;
export const state = z.object({
  lastArtifact: SchemaCicdArtifactParts.state,
  service: SchemaOsServiceParts.state,
});
