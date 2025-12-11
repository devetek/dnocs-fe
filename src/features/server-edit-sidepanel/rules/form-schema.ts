import { z } from 'zod';

export const schemaServerEdit = z.object({
  serverAddress: z.string().trim().min(1, 'Required'),
  ssh: z.object({
    username: z.string().trim().min(1, 'Required'),
    port: z.number(),
  }),
  agent: z.object({
    httpPort: z.number(),
    domain: z.string().trim().optional(),
  }),
});

export type SchemaServerEdit = z.infer<typeof schemaServerEdit>;
