import { createStrictContext } from '@/shared/libs/react-factories/createStrictContext';

import type { CloudProjectCreateModalProps as Props } from '../view/types';

export const [CpcPropsContext, useCpcPropsContext] = createStrictContext<Props>(
  'CloudProjectCreationProps',
);
