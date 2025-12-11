import z from 'zod';

import { SchemaCommon } from '@/entities/shared/rules/schema';

export type PointerIds = z.output<typeof pointerIds>;
export const pointerIds = z.object({
  machine: SchemaCommon.unitId,
  application: SchemaCommon.unitId,
  artifact: SchemaCommon.unitId,
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

export type ServerSnapshot = z.output<typeof serverSnapshot>;
export const serverSnapshot = z.object({
  id: SchemaCommon.unitId,
  hostName: z.string(),
});
