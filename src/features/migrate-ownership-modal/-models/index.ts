import { buildPassthroughContext } from '@/shared/libs/react-factories/buildPassthroughContext';

import type { MigrateOwnershipModalProps } from '../-rules/types';

export const [PropsModelProvider, usePropsModel] =
  buildPassthroughContext<MigrateOwnershipModalProps>(
    'MigrateOwnershipModalProps',
  );
