import type z from 'zod';

import { createAdapter } from '@/entities/shared/lib/createAdapter';

import type { DTOs } from '@/shared/api';
import type { KeysOnly, KeysOnlyDeep } from '@/shared/libs/types/keys-only';

import type { ApplicationCard, ApplicationDetail } from '../rules/schema';
import {
  schemaApplicationCard,
  schemaApplicationDetail,
} from '../rules/schema';

import {
  ctorConfigDefs,
  ctorDeploymentTargets,
  ctorIdentity,
  ctorState,
} from './ctors';

export const toApplicationCard = createAdapter<
  DTOs.ApplicationV1,
  ApplicationCard
>((raw) => {
  const latestDeployment = raw.deploys?.[0];

  return schemaApplicationCard.parse({
    id: String(raw.id),
    identity: ctorIdentity(raw),
    configDefs: ctorConfigDefs(raw),
    state: ctorState(raw),
    ownership: {
      team: raw.organization?.name,
      owner: raw.user?.username,
    },
    timestamp: {
      created: raw.created_at,
      updated: raw.updated_at,
    },
    additionalInfo: {
      domain: raw.domain,
      server: latestDeployment?.machine?.id
        ? {
            id: latestDeployment.machine.id,
            name: latestDeployment.machine.hostname,
          }
        : undefined,
    },
  } satisfies KeysOnlyDeep<z.input<typeof schemaApplicationCard>>);
});

export const toApplicationDetail = createAdapter<
  DTOs.ApplicationV1,
  ApplicationDetail
>((raw) => {
  return schemaApplicationDetail.parse({
    id: String(raw.id),
    identity: ctorIdentity(raw),
    configDefs: ctorConfigDefs(raw),
    deploymentTargets: ctorDeploymentTargets(raw),
    ownership: {
      team: raw.organization?.name,
      owner: raw.user?.username,
    },
    timestamp: {
      created: raw.created_at,
      updated: raw.updated_at,
    },
  } satisfies KeysOnly<z.input<typeof schemaApplicationDetail>>);
});
