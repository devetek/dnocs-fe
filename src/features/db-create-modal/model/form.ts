import { z } from 'zod';

export const formSchema = z.object({
  dbName: z //
    .string()
    .min(1)
    .max(15)
    .regex(/^[a-zA-Z0-9_]+$/, 'Valid: a-z, A-Z, 0-9, and _'),

  engine: z //
    .string()
    .min(1, 'Please select an engine!'),

  resourceID: z //
    .string()
    .min(1, 'Please select a resource!'),
});

export type FormSchema = z.infer<typeof formSchema>;
