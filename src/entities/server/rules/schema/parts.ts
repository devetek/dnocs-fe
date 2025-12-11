import z from 'zod';

import { SchemaCommon } from '@/entities/shared/rules/schema';

export type Agent = z.output<typeof agent>;
export const agent = z.object({
  version: z.string(),
  domain: z.string().optional(),
  httpPort: z.number(),
});

export type CloudProvider = z.output<typeof cloudProvider>;
export const cloudProvider = z
  .enum(['googlecloud', 'idcloudhost', 'do', 'other'])
  .catch('other')
  .default('other');

export type Cloud = z.output<typeof cloud>;
export const cloud = z.object({
  provider: cloudProvider,
  region: z.string().optional(),
});

export type Ssh = z.output<typeof ssh>;
export const ssh = z.object({
  port: z.number(),
  defaultUser: z.string(),
});

export type State = z.output<typeof state>;
export const state = SchemaCommon.createState(
  [
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

export type System = z.output<typeof system>;
export const system = z.object({
  name: z.string().optional(),
  version: z.string().optional(),
});

export type Specs = z.output<typeof specs>;
export const specs = z.object({
  cpu: z.object({
    coreCount: z.number(),
    virtualCoreCount: z.number(),
  }),
});
