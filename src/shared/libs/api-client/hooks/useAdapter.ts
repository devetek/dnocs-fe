import { useMemo } from 'react';

import useHandler from '../../react-hooks/useHandler';
import { processError } from '../lib/processor';
import type { Adapter, Response } from '../rules/types';

export default function useAdapter<Raw, Data>(
  response: Response<Raw>,
  adapter: Adapter<Raw, Data>,
): Response<Data> {
  const stableAdapter = useHandler(adapter);

  return useMemo((): Response<Data> => {
    try {
      if (response.$status === 'success') {
        const adapted = stableAdapter(response) as Response<Data>;
        adapted.$status = 'success' as const;

        return adapted;
      }

      if (response.$status === 'loading') {
        const prevDataAdapted = response.prevData
          ? stableAdapter(response.prevData)
          : undefined;

        return {
          $status: 'loading',
          prevData: prevDataAdapted,
          prevError: response.prevError,
        };
      }
    } catch (error) {
      return {
        $status: 'failed',
        ...processError(error),
      };
    }

    return response;
  }, [response, stableAdapter]);
}
