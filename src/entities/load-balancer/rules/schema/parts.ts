import { z } from 'zod';

import { schemaServerMinimal } from '@/entities/server/rules/schema';
import { SchemaCommon } from '@/entities/shared/rules/schema';

export type Webserver = z.output<typeof webserver>;
export const webserver = z.object({
  engine: z.enum(['caddy', 'unknown']),
});

export type State = z.output<typeof state>;
export const state = SchemaCommon.createState(
  [
    'pending',
    'ready',
    'progress',
    'failed',
    'deleted',
    'cancelled',
    'deleting',
    'unknown',
  ],
  'unknown',
);

export type Feature = z.output<typeof feature>;
export const feature = z.enum(['http', 'http/2', 'quic', 'ssl/tls', 'brotli']);

const supportedProtocol = z.enum(['http', 'https']);

export const relaxedUrl = (defaultProtocol = 'https') =>
  z
    .string()
    .transform((val, ctx) => {
      if (!val.includes('://')) {
        return `${defaultProtocol}://${val}`;
      }

      const [protocol] = val.split('://');

      const parsedProtocol = supportedProtocol.safeParse(protocol);
      if (parsedProtocol.error) {
        ctx.addIssue({ code: 'custom', message: 'formErrors.invalidUrl' });
        return z.NEVER;
      }

      return val;
    })
    .pipe(
      z.url({
        error: 'formErrors.invalidUrl',
      }),
    );

export type Domain = z.output<typeof domain>;
export const domain = relaxedUrl('https').transform((val, ctx) => {
  const url = new URL(val);

  const parts = url.hostname.split('.');
  const reversedParts = [...parts].reverse();
  const [tld, l2, ...sublevels] = reversedParts;

  if (!tld) {
    ctx.addIssue({ code: 'custom', message: 'formErrors.domainTldMissing' });
    return z.NEVER;
  }

  if (!l2) {
    if (url.hostname !== 'localhost') {
      ctx.addIssue({ code: 'custom', message: 'formErrors.domainL2Missing' });
      return z.NEVER;
    }
  }

  return {
    fqdn: url.host,
    protocol: url.protocol.replace(':', ''),
    tld,
    l2,
    port: url.port,
    sublevels: sublevels.reverse(),
  };
});

export type Gateway = z.output<typeof gateway>;
export const gateway = z.object({
  address: z.union([z.ipv4(), z.ipv6()]),
  server: schemaServerMinimal,
});

export type BackendAddress = z.output<typeof backendAddress>;
export const backendAddress = relaxedUrl('http').transform((val) => {
  const url = new URL(val);

  return {
    hostname: url.hostname,
    protocol: url.protocol.replace(':', ''),
  };
});

export type L7RuleUpstream = z.output<typeof l7RuleUpstream>;
export const l7RuleUpstream = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('proxy-pass'),
    matchingPath: z.string(),
    backendTarget: z.array(
      z.object({
        address: backendAddress,
        port: z.number(),
      }),
    ),
  }),
  z.object({
    type: z.literal('proxy-pass-app'),
    matchingPath: z.string(),
    target: z.object({
      applicationId: SchemaCommon.unitId,
      port: z.number(),
    }),
  }),
  z.object({
    type: z.literal('static-file'),
    matchingPath: z.string(),
    filePath: z.array(z.string()),
  }),
]);

export type L7Rule = z.output<typeof l7Rule>;
export const l7Rule = z.object({
  upstream: l7RuleUpstream,
});

export type Configuration = z.output<typeof configuration>;
export const configuration = z.discriminatedUnion('lbKind', [
  z.object({
    lbKind: z.literal('l7'),
    rules: z.array(l7Rule).min(1),
  }),
  z.object({
    lbKind: z.literal('l4'),
    ports: z.array(z.number()),
  }),
]);
