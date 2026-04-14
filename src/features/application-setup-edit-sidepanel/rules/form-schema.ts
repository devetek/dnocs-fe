import { z } from 'zod';

export const schemaLanguage = z.object({
  name: z.string().min(1, 'Language name is required'),
  version: z.string().min(1, 'Version is required'),
});

export const schemaApplicationSetupEdit = z.object({
  language: schemaLanguage,
  languages: z.array(schemaLanguage),
});

export type SchemaApplicationSetupEdit = z.infer<typeof schemaApplicationSetupEdit>;
export type SchemaLanguage = z.infer<typeof schemaLanguage>;
