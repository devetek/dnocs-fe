import type z from 'zod';

import { AdapterOsServiceFromDto } from '@/entities/os-service/adapter';
import { createAdapter } from '@/entities/shared/lib/createAdapter';

import type { DTOs } from '@/shared/api';
import type { KeysOnlyDeep } from '@/shared/libs/types/keys-only';

import type { CicdDeployment } from '../rules/schema';
import { schemaCicdDeployment } from '../rules/schema';

export const toCicdDeployment = createAdapter<DTOs.DeployV1, CicdDeployment>(
  (raw) => {
    if (raw.machine == null) {
      throw Error('raw.machine cannot be null!');
    }

    return schemaCicdDeployment.parse({
      id: String(raw.id),
      pointerIds: {
        application: String(raw.application_id),
        artifact: String(raw.artifact_id),
        machine: String(raw.machine_id),
      },
      state: {
        status: raw.installer_status,
        message: raw.error,
      },
      timestamp: {
        created: raw.created_at,
        updated: raw.updated_at,
      },
      serverSnapshot: {
        id: String(raw.machine_id),
        hostName: raw.machine.hostname,
      },
      osService: raw.service.name
        ? {
            serviceName: raw.service.name,
            serviceState: AdapterOsServiceFromDto.toState(
              raw.service.state,
            ).unwrap(),
          }
        : undefined,
    } satisfies KeysOnlyDeep<z.input<typeof schemaCicdDeployment>>);
  },
);
