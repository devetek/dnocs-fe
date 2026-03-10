import { createAdapter } from '@/entities/shared/lib/createAdapter';

import type { DTOs } from '@/shared/api';

export const toNetworkInterface = createAdapter<
  DTOs.NetworkInterface[],
  DTOs.NetworkInterface[]
>((raw) => raw);
