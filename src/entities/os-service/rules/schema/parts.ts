import { z } from 'zod';

export type State = z.infer<typeof state>;
export const state = z
  .enum([
    'running',
    'dead',
    'failed',
    'exited',
    'reload',
    'reloading',
    'restarting',
    'unknown',
  ])
  .catch('unknown')
  .default('unknown');

export type Activity = z.infer<typeof activity>;
export const activity = z.enum(['start', 'reload', 'restart', 'stop']);
