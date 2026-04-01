import type { ReactNode } from 'react';

import type { LucideProps } from 'lucide-react';

export interface CardSectionTitledProps {
  classNameWrapper?: string;
  children: ReactNode;
  icon: (props: LucideProps) => ReactNode;
  title: string;
  placement: 'main' | 'aside';
  toolbarActions?: ToolbarAction;
  toolbarContent?: ReactNode;
}

export interface ToolbarAction {
  label: string;
  onClick: () => void;
}
