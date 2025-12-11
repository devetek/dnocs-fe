import { ZodError } from 'zod';

import { result } from '@/shared/libs/result';
import type { Result } from '@/shared/libs/result/types';

type Adapter<I, O> = (input: I) => O;

export function createAdapter<I, O>(
  adapter: Adapter<I, O>,
  fallbackValue?: O,
): Adapter<I | null | undefined, Result<O, ZodError | Error>> {
  return (input) => {
    try {
      if (input) {
        const parsed = adapter(input);

        return result.ok(parsed);
      }

      if (fallbackValue) {
        return result.ok(fallbackValue);
      }

      throw Error('Data is unavailable!');
    } catch (error) {
      if (error instanceof ZodError) {
        return result.err(error);
      }

      return result.err(error instanceof Error ? error : Error(String(error)));
    }
  };
}
