import z from 'zod';

import { SchemaDomainParts } from '@/entities/domain/rules/schema';

const provider = z.enum([
  SchemaDomainParts.ProviderIdent.cloudflare,
  SchemaDomainParts.ProviderIdent.digitalOcean,
]);

export const schemaRegistrationForm = z
  .object({
    domain: z.string().min(1),
    description: z.string().optional(),
    provider,
    apiToken: z.string().min(1),
    zoneId: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (
      data.provider === SchemaDomainParts.ProviderIdent.cloudflare &&
      !data.zoneId
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['zoneId'],
        message: 'formErrors.required',
      });
    }
  });
