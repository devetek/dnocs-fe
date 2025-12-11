import type z from 'zod';

import type { DTOs } from '@/shared/api';
import type { KeysOnly, KeysOnlyDeep } from '@/shared/libs/types/keys-only';

import type { cloud, specs } from '../rules/schema/parts';

export function ctorCloud(
  raw: DTOs.MachineV1,
): KeysOnly<z.input<typeof cloud>> | null {
  const { provider, region } = raw;

  if (!provider) return null;

  return {
    provider: provider.toLocaleLowerCase(),
    region,
  };
}

export function ctorSpecs(
  raw: DTOs.MachineV1,
): KeysOnlyDeep<z.input<typeof specs>> {
  return {
    cpu: {
      coreCount: raw.cpu_core,
      virtualCoreCount: raw.vcpu,
    },
  };
}
