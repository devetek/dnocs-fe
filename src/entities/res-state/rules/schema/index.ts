import type { z } from 'zod';

import { SchemaCommon } from '@/entities/shared/rules/schema';

export type ResStateStatus = (typeof RES_STATE_STATUS)[number];
export const RES_STATE_STATUS = [
  'pending',
  'ready',
  'progress',
  'failed',
  'deleted',
  'cancelled',
  'deleting',
  'unknown',
] as const;

export type ResState = z.output<typeof resState>;
export const resState = SchemaCommon.createState(RES_STATE_STATUS, 'unknown');
