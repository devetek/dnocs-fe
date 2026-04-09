import { z } from 'zod';

export const schemaRunEnv = z.object({
  key: z.string().min(1, 'Key is required'),
  value: z.string(),
});

export const schemaApplicationRunEdit = z.object({
  command: z.string(),
  envs: z.array(schemaRunEnv),
});

export type SchemaApplicationRunEdit = z.infer<typeof schemaApplicationRunEdit>;
export type SchemaRunEnv = z.infer<typeof schemaRunEnv>;
