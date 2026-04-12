import { z } from 'zod';

export const schemaEnvironmentVars = z.array(
  z.object({
    key: z.string(),
    value: z.string(),
  }),
);

export const schemaAutoDeploy = z.object({
  isEnabled: z.boolean(),
  fromBranch: z
    .string()
    .optional()
    .transform((val) =>
      typeof val === 'string' && val.trim() === '' ? undefined : val,
    ),
});

export type SchemaEnvironmentVars = z.infer<typeof schemaEnvironmentVars>;

export const schemaCommand = z.array(z.string());

export const schemaApplicationEdit = z.object({
  autoDeploy: schemaAutoDeploy,
  workdir: z.string().optional(),
  port: z.coerce.number().int().min(1).max(65535).optional(),
});

export type SchemaApplicationEdit = z.infer<typeof schemaApplicationEdit>;
