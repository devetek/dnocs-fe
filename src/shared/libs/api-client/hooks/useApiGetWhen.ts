import type { UseApiGetWhenParams } from '../rules/types';

import useApiGet from './useApiGet';

export default function useApiGetWhen<D>(params: UseApiGetWhenParams) {
  const { config, options } = params;

  return useApiGet<D>(
    {
      url: config?.url ?? '',
    },
    {
      ...(options ?? {}),
      skip: config == null || options?.skip,
    },
  );
}
