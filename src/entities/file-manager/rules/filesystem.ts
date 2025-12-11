import type { ResponseError } from '@/shared/libs/api-client/rules/types';

import type { SchemaFilesystemContent } from './schema';

export type FullPath = string;

export type FilesystemRegistry = Map<FullPath, FilesystemRegistryEntry>;

export type FilesystemRegistryEntry =
  | { status: 'success'; contents: SchemaFilesystemContent[] }
  | ({ status: 'failed' } & ResponseError);
