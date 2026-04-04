import { z } from 'zod';

import { SchemaCommon } from '@/entities/shared/rules/schema';

import { dnsRecord, domain, provider, providerDetails } from './parts';

export * as SchemaDomainParts from './parts';

export type DomainEssentials = z.output<typeof schemaDomainEssentials>;
export const schemaDomainEssentials = z.object({
  id: SchemaCommon.unitId,
  ownership: SchemaCommon.ownership,
  timestamp: SchemaCommon.timestamp,
  domain,
  description: z.string().optional(),
});

export type DomainCard = z.output<typeof schemaDomainCard>;
export const schemaDomainCard = z.intersection(
  schemaDomainEssentials,
  z.object({
    provider,
  }),
);

export type DomainDetails = z.output<typeof schemaDomainDetails>;
export const schemaDomainDetails = z.intersection(
  schemaDomainEssentials,
  z.object({
    providerDetails,
    dnsRecords: z.array(dnsRecord),
  }),
);
