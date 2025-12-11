import type z from 'zod';

import { createAdapter } from '@/entities/shared/lib/createAdapter';

import type { DTOs } from '@/shared/api';
import type { KeysOnlyDeep } from '@/shared/libs/types/keys-only';

import type { SchemaFilesystemContent } from '../rules/schema';
import { schemaFilesystemContent } from '../rules/schema';

export const toFilesystemContent = createAdapter<
  DTOs.FolderOrigin,
  SchemaFilesystemContent
>((raw) => {
  const { is_dir, real_size, name, permissions, last_modified } = raw;

  return schemaFilesystemContent.parse({
    kind: is_dir ? 'folder' : 'file',
    name,
    size: !is_dir ? real_size : undefined,
    timestamp: {
      created: last_modified,
      updated: last_modified,
    },
    unixPermission: permissions,
  } satisfies KeysOnlyDeep<z.input<typeof schemaFilesystemContent>>);
});
