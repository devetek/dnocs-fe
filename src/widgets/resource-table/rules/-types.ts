import type { ComponentType, JSX, ReactNode } from 'react';

import type { useDevetekTranslations } from '@/services/i18n';

// =============================================================================
//   Public Interfaces
// =============================================================================

export interface Props<D> extends BaseProps<D> {
  className?: string;
  data: D[];
  size?: 'normal' | 'sm';
}

export interface BuilderParams<D> extends BaseProps<D> {
  contentWrapper?:
    | ContentWrapper
    | {
        component: ContentWrapper;
        excludedKeys: string[];
      };
}

// =============================================================================
//   Building Blocks
// =============================================================================

type ContentWrapper = ComponentType<{ children: ReactNode }>;

interface BaseProps<D> {
  columns: Array<Column<D>>;
  rowPrepend?: ComponentType<ColumnContentPendProps<D>>;
  rowAppend?: ComponentType<ColumnContentPendProps<D>>;
}

export interface Column<D> {
  key: string;
  width?: `${number}${'fr' | 'px'}`;
  header?: string | JSX.Element | ((data: ColumnHeaderProps<D>) => JSX.Element);
  content: ComponentType<ColumnContentProps<D>>;
}

export interface ColumnHeaderProps<D> {
  t: ReturnType<typeof useDevetekTranslations>;
  data: D[];
}

interface ColumnContentBaseProps<D> {
  row: D;
  data: D[];
  index: number;
}

export interface ColumnContentPendProps<D> extends ColumnContentBaseProps<D> {}

export interface ColumnContentProps<D> extends ColumnContentBaseProps<D> {
  showPrepend: boolean;
  showAppend: boolean;

  onViewPrepend: (show?: boolean) => void;
  onViewAppend: (show?: boolean) => void;
}
