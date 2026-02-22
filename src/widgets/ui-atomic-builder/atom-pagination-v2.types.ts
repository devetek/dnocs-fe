import type {
  PaginationV2Props,
  RenderPageInfo,
} from '@/shared/presentation/atoms/PaginationV2/types';

export interface BuildPaginationV2Params {
  customRenderPageInfo?:
    | { type: 'hide' }
    | { type: 'i18n'; key: string }
    | { type: 'custom'; component: RenderPageInfo };
}

export type PaginationV2DerivedProps = Omit<
  PaginationV2Props,
  'renderPageInfo'
>;
