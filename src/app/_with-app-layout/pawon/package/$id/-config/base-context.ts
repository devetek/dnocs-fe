import { createStrictContext } from '@/shared/libs/react-factories/createStrictContext';

export const [BaseContext, useBaseContext] =
  createStrictContext<BaseContextValue>('PackageDetailPageBase');

export interface BaseContextValue {
  id: string;
}
