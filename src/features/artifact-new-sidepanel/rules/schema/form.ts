import z from 'zod';

import { SchemaCommon } from '@/entities/shared/rules/schema';

export const schemaArtifactNewForm = z.object({
  fromBranch: z.string().min(1, { error: 'formErrors.required' }),
  appConfigFile: z.string().min(1, { error: 'formErrors.required' }),
  workerId: SchemaCommon.unitId.min(1, { error: 'formErrors.required' }),
});
