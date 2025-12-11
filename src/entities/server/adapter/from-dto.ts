import type z from 'zod';

import { createAdapter } from '@/entities/shared/lib/createAdapter';

import type { DTOs } from '@/shared/api';
import type { KeysOnlyDeep } from '@/shared/libs/types/keys-only';

import type { ServerCard, ServerDetail, ServerMinimal } from '../rules/schema';
import {
  schemaServerCard,
  schemaServerDetail,
  schemaServerMinimal,
} from '../rules/schema';

import { ctorCloud, ctorSpecs } from './ctors';

export const toMinimal = createAdapter<DTOs.MachineV1, ServerMinimal>((raw) =>
  schemaServerMinimal.parse({
    id: String(raw.id),
    hostname: raw.hostname,
  } satisfies KeysOnlyDeep<z.input<typeof schemaServerMinimal>>),
);

export const toServerCard = createAdapter<DTOs.MachineV1, ServerCard>((raw) =>
  schemaServerCard.parse({
    id: String(raw.id),
    agent: {
      version: raw.agent_version,
      domain: raw.domain,
      httpPort: raw.http_port ? Number(raw.http_port) : undefined,
    },
    cloud: ctorCloud(raw),
    host: {
      address: raw.address,
      name: raw.hostname,
    },
    ownership: {
      owner: raw.user?.username,
      team: raw.organization?.name,
    },
    ssh: {
      port: raw.ssh_port ? Number(raw.ssh_port) : undefined,
      defaultUser: raw.default_user,
    },
    state: {
      message: raw.error,
      status: raw.status,
    },
    system: {
      name: raw.distributor,
      version: raw.version,
    },
    timestamp: {
      created: raw.created_at,
      updated: raw.updated_at,
    },
  } satisfies KeysOnlyDeep<z.input<typeof schemaServerCard>>),
);

export const toServerDetail = createAdapter<DTOs.MachineV1, ServerDetail>(
  (raw) =>
    schemaServerDetail.parse({
      id: String(raw.id),
      agent: {
        version: raw.agent_version,
        domain: raw.domain,
        httpPort: raw.http_port ? Number(raw.http_port) : undefined,
      },
      cloud: ctorCloud(raw),
      host: {
        address: raw.address,
        name: raw.hostname,
      },
      ownership: {
        owner: raw.user?.username,
        team: raw.organization?.name,
      },
      secret: {
        id: raw.secret_id ? String(raw.secret_id) : undefined,
      },
      ssh: {
        port: raw.ssh_port ? Number(raw.ssh_port) : undefined,
        defaultUser: raw.default_user,
      },
      state: {
        message: raw.error,
        status: raw.status,
      },
      system: {
        name: raw.distributor,
        version: raw.version,
      },
      timestamp: {
        created: raw.created_at,
        updated: raw.updated_at,
      },
      specs: ctorSpecs(raw),
    } satisfies KeysOnlyDeep<z.input<typeof schemaServerDetail>>),
);
