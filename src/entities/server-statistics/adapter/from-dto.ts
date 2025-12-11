import type z from 'zod';

import { createAdapter } from '@/entities/shared/lib/createAdapter';

import type { Dto as CpuUsageDto } from '@/shared/api/server.origin.$id.cpu.usage';
import type { Dto as DiskUsageDto } from '@/shared/api/server.origin.$id.disk.usage';
import type { Dto as MemoryUsageDto } from '@/shared/api/server.origin.$id.memory.usage';
import type { KeysOnlyDeep } from '@/shared/libs/types/keys-only';

import type { CpuStats, DiskStats, MemoryStats } from '../rules/schema';
import {
  schemaCpuStats,
  schemaDiskStats,
  schemaMemoryStats,
} from '../rules/schema';

export const usageCpu = createAdapter<CpuUsageDto, CpuStats>((raw) =>
  schemaCpuStats.parse({
    usedInPercent: raw.cpu_usage,
  } satisfies KeysOnlyDeep<z.input<typeof schemaCpuStats>>),
);

export const usageMemory = createAdapter<MemoryUsageDto, MemoryStats>((raw) =>
  schemaMemoryStats.parse({
    total: raw.total,
    used: raw.used,
  } satisfies KeysOnlyDeep<z.input<typeof schemaMemoryStats>>),
);

export const usageDisk = createAdapter<DiskUsageDto, DiskStats>((raw) =>
  schemaDiskStats.parse({
    total: raw.total,
    used: raw.used,
    free: raw.free,
  } satisfies KeysOnlyDeep<z.input<typeof schemaDiskStats>>),
);
