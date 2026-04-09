import { z } from 'zod';

export const schemaBuildStep = z.object({
  name: z.string().min(1, 'Step name is required'),
  commandText: z.string(), // newline-separated commands
  archive: z.array(z.string()).optional(), // pass-through, not editable
});

export const schemaBuildEnv = z.object({
  key: z.string().min(1, 'Key is required'),
  value: z.string(),
});

export const schemaApplicationBuildEdit = z.object({
  steps: z.array(schemaBuildStep),
  envs: z.array(schemaBuildEnv),
});

export type SchemaApplicationBuildEdit = z.infer<typeof schemaApplicationBuildEdit>;
export type SchemaBuildStep = z.infer<typeof schemaBuildStep>;
export type SchemaBuildEnv = z.infer<typeof schemaBuildEnv>;
