import type { ComponentType, ReactNode } from 'react';

import type { LucideProps } from 'lucide-react';

export interface Props {
  classNameWrapper?: string;
  classNameChildrenWrapper?: string;
  isCollapsible?: boolean;
  defaultCollapsed?: boolean;
  children: ReactNode;
  icon: (props: LucideProps) => ReactNode;
  title: string;
  placement: 'main' | 'aside';
  toolbarActions?: ToolbarAction;
  toolbarContent?: ReactNode;
}

export type ToolbarAction = ToolbarActionContent & {
  onClick: () => void;
};

export type ToolbarActionContent =
  | { label?: string; icon: ComponentType<LucideProps> }
  | { label: string; icon?: ComponentType<LucideProps> }
  | { label: string; icon: ComponentType<LucideProps> };
