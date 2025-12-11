import type z from 'zod';

import { createAdapter } from '@/entities/shared/lib/createAdapter';

import type { DTOs } from '@/shared/api';
import type { KeysOnlyDeep } from '@/shared/libs/types/keys-only';

import type { CicdArtifact } from '../rules/schema';
import { schemaCicdArtifact } from '../rules/schema';

import {
  ctorCommitMetadata,
  ctorConfigSnapshot,
  ctorPointerIds,
  ctorState,
  ctorTimestamp,
} from './ctors';

export const toCicdArtifact = createAdapter<DTOs.ArtifactV1, CicdArtifact>(
  (raw) => {
    return schemaCicdArtifact.parse({
      id: String(raw.id),
      state: ctorState(raw),
      executor: {
        userName: raw.user?.username,
      },
      pointerIds: ctorPointerIds(raw),
      commitMetadata: ctorCommitMetadata(raw),
      configSnapshot: ctorConfigSnapshot(raw),
      timestamp: ctorTimestamp(raw),
    } satisfies KeysOnlyDeep<z.input<typeof schemaCicdArtifact>>);
  },
);
