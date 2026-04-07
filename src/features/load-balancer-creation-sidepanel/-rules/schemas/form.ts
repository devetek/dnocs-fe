import { z } from 'zod';

import { SchemaCommon } from '@/entities/shared/rules/schema';

const protocols = [
  'http',
  'tcp',
  'udp',
  'postgresql',
  'mysql',
  'mongodb',
  'redis',
] as const;

const engine = ['nginx', 'caddy', 'haproxy', 'envoy', 'traefik'] as const;

const upstream = z.object({
  address: z.string().min(1, 'formErrors.required'),
  port: z.number().int().positive('formErrors.portPositive'),
});

const l7Rule = z
  .object({
    pathMatch: z.string().min(1, 'formErrors.required'),
    type: z.enum(['proxy-pass', 'proxy-pass-app']),
    upstreamsIfProxyPass: z.array(upstream).optional(),
    applicationIdIfProxyPassApp: SchemaCommon.unitId.optional(),
  })
  .superRefine((data, ctx) => {
    if (
      data.type === 'proxy-pass' &&
      (!data.upstreamsIfProxyPass || data.upstreamsIfProxyPass.length === 0)
    ) {
      ctx.addIssue({
        code: 'custom',
        path: ['upstreamsIfProxyPass'],
        message: 'formErrors.required',
      });
    }

    if (data.type === 'proxy-pass-app' && !data.applicationIdIfProxyPassApp) {
      ctx.addIssue({
        code: 'custom',
        path: ['applicationIdIfProxyPassApp'],
        message: 'formErrors.required',
      });
    }
  });

const l4Rule = z.object({
  upstreams: z.array(upstream).min(1, 'formErrors.required'),
});

export const schemaCreationForm = z
  .object({
    domain: z.string().min(1, 'formErrors.required'),
    internalDomainMetadata: z
      .object({
        id: SchemaCommon.unitId,
        subdomain: z.string(),
      })
      .optional(),
    description: z.string(),
    serverId: SchemaCommon.unitId.min(1, 'formErrors.required'),
    lbKind: z.enum(['l7', 'l4']),
    engine: z.enum(engine),
    features: z.object({
      protocol: z.enum(protocols).optional(),
      sslEnabled: z.boolean().default(true),
    }),
    l7rules: z.array(l7Rule).optional(),
    l4rule: l4Rule.optional(),
  })
  .superRefine((data, ctx) => {
    if (data.lbKind === 'l7') {
      if (!data.l7rules || data.l7rules.length === 0) {
        ctx.addIssue({
          code: 'custom',
          path: ['l7rules'],
          message: 'formErrors.required',
        });
      }
    }

    if (data.lbKind === 'l4') {
      if (!data.l4rule) {
        ctx.addIssue({
          code: 'custom',
          path: ['l4rule'],
          message: 'formErrors.required',
        });
      }

      if (data.features.protocol == null) {
        ctx.addIssue({
          code: 'custom',
          path: ['features', 'protocol'],
          message: 'formErrors.required',
        });
      }
    }
  });

export type CreationFormValues = z.input<typeof schemaCreationForm>;
