import type { ReactNode } from 'react';

import type { LucideProps } from 'lucide-react';

export type CommonIcon = (props: LucideProps) => ReactNode;

export interface ActionPopoverProps {
  children: ReactNode;
  actions: Action[];
}

export interface MenuItemProps {
  action: Action;
  onClickItem: () => void;
}

export interface Action {
  variant?: 'normal' | 'danger';
  disabled?: boolean;
  className?: string;
  label: string;
  icon?: CommonIcon;
  iconActive?: CommonIcon;
  onClick?: () => void;
}
