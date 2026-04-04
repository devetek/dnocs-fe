import type { ReactNode } from 'react';

import type { Response } from '@/shared/libs/api-client/rules/types';

export interface BuildResponseViewParams<Data, E> {
  useResponse: () => Response<Data, E>;
  fallbackError: (props: E) => ReactNode;
  fallbackLoading: () => ReactNode;
  render: (props: ResponseViewRenderProps<Data>) => ReactNode;
}

export type ResponseViewRenderProps<Data> = Data & {
  $status: 'success' | 'refetching';
};
