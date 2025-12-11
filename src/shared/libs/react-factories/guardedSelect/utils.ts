import type { Response } from '../../api-client/rules/types';

import type { InferStore, Selector, UseModelSelector } from './types';

export function couple<M extends UseModelSelector<any>, R>(
  useModel: M,
  selector: Selector<InferStore<M>, Response<R>>,
) {
  return [useModel, selector] as const;
}
