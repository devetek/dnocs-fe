import { z } from 'zod';

export const schemaEnvironmentVars = z.array(
  z.object({
    key: z.string(),
    value: z.string(),
  }),
);

export const schemaAutoDeploy = z
  .object({
    isEnabled: z.boolean(),
    fromBranch: z
      .string()
      .optional()
      .transform((val) =>
        typeof val === 'string' && val.trim() === '' ? undefined : val,
      ),
  })
  .superRefine((data, ctx) => {
    if (data.isEnabled && !data.fromBranch) {
      ctx.addIssue({
        code: 'custom',
        message: 'formErrors.branchRequiredWhenAutoDeploy',
        path: ['fromBranch'],
      });
    }
  });

export type SchemaEnvironmentVars = z.infer<typeof schemaEnvironmentVars>;

export const schemaCommand = z.array(z.string());

export const schemaApplicationEdit = z.object({
  autoDeploy: schemaAutoDeploy,
  // build: z.object({
  //   command: schemaCommand,
  //   environmentVars: schemaEnvironmentVars,
  // }),
  // run: z.object({
  //   command: schemaCommand,
  //   port: z.number(),
  //   environmentVars: schemaEnvironmentVars,
  // }),
});

export type SchemaApplicationEdit = z.infer<typeof schemaApplicationEdit>;
