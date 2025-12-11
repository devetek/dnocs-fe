import dayjs from 'dayjs';
import z from 'zod';

export type CpuStats = z.output<typeof schemaCpuStats>;
export const schemaCpuStats = z
  .object({
    usedInPercent: z.number(),
  })
  .transform((orig) => {
    const { usedInPercent } = orig;

    return {
      timestamp: dayjs().toDate(),
      usedInPercent,
    };
  });

export type MemoryStats = z.output<typeof schemaMemoryStats>;
export const schemaMemoryStats = z
  .object({
    used: z.number(),
    total: z.number(),
  })
  .transform((orig) => {
    const { total, used } = orig;

    return {
      timestamp: dayjs().toDate(),
      usedInPercent: (used / total) * 100,
      usedInMB: used / 1_000_000,
      freeInMB: (total - used) / 1_000_000,
      totalInMB: total / 1_000_000,
    };
  });

export type DiskStats = z.output<typeof schemaDiskStats>;
export const schemaDiskStats = z
  .object({
    used: z.number(),
    total: z.number(),
    free: z.number(),
  })
  .transform((orig) => {
    const { total, free, used } = orig;

    return {
      timestamp: dayjs().toDate(),
      usedInPercent: (used / total) * 100,
      usedInMB: used / 1_000_000,
      freeInMB: free / 1_000_000,
      totalInMB: total / 1_000_000,
    };
  });
