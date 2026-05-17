import type z from 'zod';

import { AdapterOsServiceFromDto } from '@/entities/os-service/adapter';
import { createAdapter } from '@/entities/shared/lib/createAdapter';
import '@/shared/libs/browser/string';

import {
  ctorCommitMetadata,
  ctorConfigSnapshot,
} from '@/entities/cicd-artifact/adapter/ctors';

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
      state: {
        status: raw.installer_status,
        message: raw.error,
      },
      timestamp: {
        created: raw.created_at,
        updated: raw.updated_at,
      },
      executor: {
        userName: raw.user?.username,
      },
      deploymentMetadata: {
        artifact: {
          id: String.tryFrom(raw.artifact_id),
          commitMetadata: ctorCommitMetadata(raw.artifact),
        },
        server: {
          id: String.tryFrom(raw.machine_id),
          hostname: raw.machine?.hostname,
        },
        targetAppId: String.tryFrom(raw.application_id),
        osService: raw.service.name
          ? {
              serviceName: raw.service.name,
              serviceState: AdapterOsServiceFromDto.toState(
                raw.service.state,
              ).unwrap(),
            }
          : undefined,
      },
      configSnapshot: ctorConfigSnapshot(raw.artifact),
    } satisfies KeysOnlyDeep<z.input<typeof schemaCicdDeployment>>);
  },
);
