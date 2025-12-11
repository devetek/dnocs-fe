import z from 'zod';

import { contentFile, contentFolder } from './parts';

export * as SchemaFileManagerParts from './parts';

export type SchemaFilesystemContent = z.output<typeof schemaFilesystemContent>;
export const schemaFilesystemContent = z.discriminatedUnion('kind', [
  z.object({ kind: z.literal('file') }).extend(contentFile.shape),
  z.object({ kind: z.literal('folder') }).extend(contentFolder.shape),
]);
