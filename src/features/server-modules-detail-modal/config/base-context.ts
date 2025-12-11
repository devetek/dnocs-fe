import { createStrictContext } from '@/shared/libs/react-factories/createStrictContext';

import type { ServerModulesDetailModalProps as Props } from '../view/types';

export const [BaseContext, useBaseContext] = createStrictContext<Props>(
  'ServerModulesDetailModalBase',
);
