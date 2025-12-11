import type z from 'zod';

import type { DTOs } from '@/shared/api';
import { iife } from '@/shared/libs/browser/iife';
import { excludeNully } from '@/shared/libs/browser/typeguards';
import type { KeysOnlyDeep } from '@/shared/libs/types/keys-only';

import type {
  commitMetadata,
  configSnapshot,
  pointerIds,
  state,
  timestamp,
} from '../rules/schema/parts';

export function ctorState(
  raw: DTOs.ArtifactV1,
): KeysOnlyDeep<z.input<typeof state>> {
  return {
    message: raw.error,
    status: raw.installer_status,
  };
}

export function ctorPointerIds(
  raw: DTOs.ArtifactV1,
): KeysOnlyDeep<z.input<typeof pointerIds>> {
  return {
    application: String(raw.application_id),
    machine: String(raw.machine_id),
  };
}

export function ctorCommitMetadata(
  raw: DTOs.ArtifactV1,
): KeysOnlyDeep<z.input<typeof commitMetadata>> {
  return {
    fromBranch: raw.branch,
    head: raw.head,
    message: raw.description,
  };
}

export function ctorConfigSnapshot(
  raw: DTOs.ArtifactV1,
): KeysOnlyDeep<z.input<typeof configSnapshot>> {
  const rawLcBuild = raw.app_definition?.build.target.machine;
  const rawLcRun = raw.app_definition?.run;

  const mainLanguage = iife(() => {
    const { name, version } = raw.app_definition?.setup.language ?? {};

    if (!name || !version) return null;

    return {
      name,
      version: String(version),
    };
  });

  return {
    lifecycle: {
      build: {
        steps: rawLcBuild?.steps,
        envs: rawLcBuild?.environment ?? [],
      },
      run: {
        envs: rawLcRun?.environment ?? [],
        command: rawLcRun?.command,
        name: rawLcRun?.name,
        port: rawLcRun?.port,
      },
      setup: {
        languages: [mainLanguage].filter(excludeNully),
      },
    },
  };
}

export function ctorTimestamp(
  raw: DTOs.ArtifactV1,
): KeysOnlyDeep<z.input<typeof timestamp>> {
  return {
    created: raw.created_at,
    updated: raw.updated_at,
  };
}
