import z from 'zod';

import { SchemaCommon } from '@/entities/shared/rules/schema';

export type MigrateOwnershipForm = z.output<typeof schemaMigrateOwnershipForm>;
export const schemaMigrateOwnershipForm = z.object({
  newTeamId: SchemaCommon.unitId,
});
