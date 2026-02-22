import type { JSX, RefObject } from 'react';

export interface PaginationV2Props {
  totalPage: number;
  currentPage: number;

  alwaysShowPaginationRows?: boolean;
  renderPageInfo?: RenderPageInfo;

  onPageChange?: (newPage: number) => void;
  onClickBack?: () => void;
  onClickForward?: () => void;
}

export type RenderPageInfo = (
  props: RenderPageInfoProps,
) => string | JSX.Element;

export interface RenderPageInfoProps {
  totalPage: number;
  currentPage: number;
}

export interface PaginationRowsProps {
  ref?: RefObject<HTMLDivElement | null>;
  totalPage: number;
  currentPage: number;
  onPageChange?: (newPage: number) => void;
}

export interface NavButtonProps {
  icon: 'back' | 'forward';
  isDisabled?: boolean;

  onClick?: () => void;
}
