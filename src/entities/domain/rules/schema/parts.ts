import * as tldts from 'tldts';
import { z } from 'zod';

import { SchemaCommon } from '@/entities/shared/rules/schema';

export const ProviderIdent = {
  cloudflare: 'CloudFlare',
  digitalOcean: 'DigitalOcean',
  unknown: 'unknown',
} as const;

export const domain = z.string().transform((val, ctx) => {
  const {
    publicSuffix: tld,
    domainWithoutSuffix: l1,
    subdomain,
    hostname,
  } = tldts.parse(val);

  if (!hostname) {
    ctx.addIssue({
      code: 'custom',
      message: 'formErrors.parseDomain.invalidTld',
    });
    return z.NEVER;
  }

  if (!tld) {
    ctx.addIssue({
      code: 'custom',
      message: 'formErrors.parseDomain.invalidTld',
    });
    return z.NEVER;
  }

  if (!l1) {
    ctx.addIssue({
      code: 'custom',
      message: 'formErrors.parseDomain.invalidDomain',
    });
    return z.NEVER;
  }

  return {
    hostname,
    tld,
    l1,
    subdomain,
  };
});

export type Provider = z.output<typeof provider>;
export const provider = z.enum([
  ProviderIdent.cloudflare,
  ProviderIdent.digitalOcean,
  ProviderIdent.unknown,
]);

export type ProviderDetails = z.output<typeof providerDetails>;
export const providerDetails = z.discriminatedUnion('ident', [
  z.object({
    ident: z.literal(ProviderIdent.cloudflare),
    params: z.object({
      apiToken: z.string(),
      zoneId: z.string(),
    }),
  }),
  z.object({
    ident: z.literal(ProviderIdent.digitalOcean),
    params: z.object({
      apiToken: z.string(),
      zoneId: z.string(),
    }),
  }),
  z.object({
    ident: z.literal(ProviderIdent.unknown),
    rawParams: z.string(),
  }),
]);

export const dnsRecordBase = z.object({
  id: SchemaCommon.unitId,
  name: z.string(),
  content: z.string(),
  ttl: z.number(),
  comment: z.string().optional(),
});

export type DnsRecord = z.output<typeof dnsRecord>;
export const dnsRecord = z.intersection(
  dnsRecordBase,
  z.object({
    type: z.string(),
  }),
);
