import dayjs from 'dayjs';
import z from 'zod';

import { SchemaAppConfig, SchemaCommon } from '@/entities/shared/rules/schema';

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

export type PointerIds = z.output<typeof pointerIds>;
export const pointerIds = z.object({
  application: SchemaCommon.unitId,
  machine: SchemaCommon.unitId,
});

export type CommitMetadata = z.output<typeof commitMetadata>;
export const commitMetadata = z
  .object({
    head: z.string(),
    fromBranch: z.string(),
    message: z.string(),
  })
  .transform((payload) => {
    const { head, fromBranch, message } = payload;

    const [title, ...descriptions] = message.split('\n\n');

    return {
      head,
      fromBranch,
      title,
      description: descriptions.join('; ').replaceAll('*', ''),
    };
  });

export type ConfigSnapshot = z.output<typeof configSnapshot>;
export const configSnapshot = z.object({
  lifecycle: SchemaAppConfig.lifecycle,
});

export type Executor = z.output<typeof executor>;
export const executor = z.object({
  userName: z.string(),
});

export type Timestamp = z.output<typeof timestamp>;
export const timestamp = SchemaCommon.timestamp.transform((ts) => {
  const { created, updated } = ts;

  return {
    created,
    updated,
    buildTimeInSeconds: dayjs(updated).diff(created, 'second'),
  };
});
