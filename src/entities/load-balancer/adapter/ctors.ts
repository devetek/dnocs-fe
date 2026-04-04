import type { z } from 'zod';

import type { DTOs } from '@/shared/api';
import { iife } from '@/shared/libs/browser/fn';
import type { KeysOnlyDeep } from '@/shared/libs/types/keys-only';

import type {
  L7Rule,
  configuration,
  feature,
  gateway,
  state,
  webserver,
} from '../rules/schema/parts';

export function ctorState(raw: DTOs.RouterV1) {
  return {
    message: raw.error,
    status: raw.installer_status,
  } as KeysOnlyDeep<z.input<typeof state>>;
}

export function ctorConfiguration(raw: DTOs.RouterV1) {
  const rules = iife(() => {
    if (!Number.isNaN(Number(raw.upstream))) {
      return [
        {
          upstream: {
            type: 'proxy-pass-app',
            matchingPath: '/*',
            target: {
              applicationId: String(raw.upstream),
              port: -1,
            },
          },
        },
      ] as KeysOnlyDeep<L7Rule[]>;
    }

    const [backendAddress, backendPort = ''] = raw.upstream?.split(':') ?? [];

    return [
      {
        upstream: {
          type: 'proxy-pass',
          backendTarget: [
            {
              address: backendAddress,
              port: parseInt(backendPort) || 0,
            },
          ],
          matchingPath: '/*',
        },
      },
    ] as KeysOnlyDeep<L7Rule[]>;
  });

  return {
    lbKind: 'l7',
    rules,
  } as KeysOnlyDeep<z.input<typeof configuration>>;
}

export function ctorFeatures(_: DTOs.RouterV1) {
  return new Set<z.input<typeof feature>>([
    'http',
    'http/2',
    'quic',
    'ssl/tls',
    'brotli',
  ]);
}

export function ctorWebserver(raw: DTOs.RouterV1) {
  return {
    engine: raw.engine,
  } as KeysOnlyDeep<z.input<typeof webserver>>;
}

export function ctorGateway(raw: DTOs.RouterV1) {
  if (raw.machine == null) return undefined;

  return {
    address: raw.machine?.address,
    server: {
      id: String(raw.machine_id),
      hostname: raw.machine?.hostname,
    },
  } as KeysOnlyDeep<z.input<typeof gateway>>;
}
