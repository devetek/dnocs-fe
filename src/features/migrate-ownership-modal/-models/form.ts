import { zodResolver } from '@hookform/resolvers/zod';

import { buildRHF } from '@/shared/libs/react-factories/buildRHF';

import { schemaMigrateOwnershipForm } from '../-rules/schemas/form';

export const [FormProvider, useMigrateOwnershipForm] = buildRHF({
  resolver: zodResolver(schemaMigrateOwnershipForm),
  defaultValues: {
    newTeamId: '',
  },
});
