import { buildContext } from '@/shared/libs/react-factories/buildContext';

import type { CloudProjectDetailModalProps as Props } from './types';

export const [CpdProvider, useCpdContext] = buildContext(
  'CloudProjectDetailModal',
  (props: Props) => {
    return {
      props,
    };
  },
);
