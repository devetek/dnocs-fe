import type z from 'zod';

import { createAdapter } from '@/entities/shared/lib/createAdapter';

import type { DTOs } from '@/shared/api';
import type { KeysOnly } from '@/shared/libs/types/keys-only';

import type { OsService } from '../rules/schema';
import { SchemaOsServiceParts, schemaOsService } from '../rules/schema';

export const toState = createAdapter<string, SchemaOsServiceParts.State>(
  (raw) => SchemaOsServiceParts.state.parse(raw),
  'unknown',
);

export const toOsService = createAdapter<DTOs.ServiceOriginV1, OsService>(
  (raw) =>
    schemaOsService.parse({
      serviceName: raw.name.replace(/^(●|\*)\s*/, ''),
      serviceState: toState(raw.state).unwrap(),
    } satisfies KeysOnly<z.input<typeof schemaOsService>>),
);
