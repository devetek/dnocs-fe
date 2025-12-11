import { useState } from 'react';

import useHandler from './useHandler';

/**
 * A custom hook for managing a stateful dataset, allowing you to add new values
 * and optionally keep only the last N values.
 *
 * @template T - The type of the data stored in the dataset.
 * @param options - Configuration options for the hook.
 * @param [options.keepLast] - If provided, only the last `keepLast` number of items will be kept in the dataset.
 *
 * @returns - A tuple containing:
 *   - The current dataset as an array of type `T`.
 *   - A function to add a new value to the dataset.
 *
 * @example
 * const [data, addData] = useStatsState<number>({ keepLast: 5 });
 * addData(1);
 * addData(2);
 * // data will be [1, 2]
 * addData(3);
 * addData(4);
 * addData(5);
 * addData(6);
 * // data will be [2, 3, 4, 5, 6] because keepLast is 5
 */
export default function useStatsState<T>({ keepLast }: Options) {
  const [dataset, setDataset] = useState<T[]>([]);

  const addToDataset = useHandler((value: T) => {
    setDataset((prev) => {
      const newDataset = [...prev];

      newDataset.push(value);

      if (keepLast) {
        return newDataset.slice(-keepLast);
      }

      return newDataset;
    });
  });

  return [dataset, addToDataset] as const;
}

interface Options {
  keepLast?: number;
}
