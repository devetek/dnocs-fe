import dayjs from 'dayjs';
import z from 'zod';

// =============================================================================
//   Unit
// =============================================================================

export type UnitId = z.output<typeof unitId>;
export const unitId = z.string();

// =============================================================================
//   Common
// =============================================================================

export type Ownership = z.output<typeof ownership>;
export const ownership = z.object({
  team: z.string().optional(),
  owner: z.string(),
});

export type Timestamp = z.output<typeof timestamp>;
export const timestamp = z
  .object({
    created: z.string(),
    updated: z.string(),
  })
  .transform((orig) => {
    const created = dayjs(orig.created).toDate();
    const updated = dayjs(orig.updated).toDate();

    return {
      created,
      updated,
    };
  });

export function createState<
  const T extends readonly [string, ...string[]],
  K extends T[number],
>(status: T, defaultValue: K) {
  return z.object({
    status: z.enum(status).default(defaultValue),
    message: z.string().optional(),
  });
}
