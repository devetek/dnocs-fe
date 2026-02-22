import type { ReactNode } from 'react';

import type { Response } from '@/shared/libs/api-client/rules/types';

export interface BuildResponseViewParams<Data> {
  useResponse: () => Response<Data>;
  fallbackError: (props: ResponseViewFallbackErrorProps) => ReactNode;
  fallbackLoading: () => ReactNode;
  render: (props: ResponseViewRenderProps<Data>) => ReactNode;
}

export type ResponseViewRenderProps<Data> = Data & {
  $status: 'success' | 'refetching';
};

export interface ResponseViewFallbackErrorProps {
  error: Error;
}
