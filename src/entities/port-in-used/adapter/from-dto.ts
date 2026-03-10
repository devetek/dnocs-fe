import { createAdapter } from '@/entities/shared/lib/createAdapter';

import type { DTOs } from '@/shared/api';

export const toPortInUsed = createAdapter<
  DTOs.PortInUsed[],
  DTOs.PortInUsed[]
>((raw) => raw);
