import type { ReactNode, Ref } from 'react';

import type { LucideProps } from 'lucide-react';

export type CommonIcon = (props: LucideProps) => ReactNode;

export interface Action {
  variant?: 'normal' | 'destructive';
  disabled?: boolean;
  className?: string;
  label: string;
  icon?: CommonIcon;
  iconActive?: CommonIcon;
  onClick?: () => void;
}

export interface ActionButtonProps {
  ref?: Ref<HTMLButtonElement>;
  action: Action;
  isPrimary?: boolean;
  isActive?: boolean;
  visibleActionOnlyIcon?: boolean;
}

export interface MenuItemProps {
  action: Action;
  onClickItem: () => void;
}

export interface MainContentStatus {
  icon: CommonIcon;
  text: string;
}

export interface AdditionalsInfo {
  icon: CommonIcon;
  infoLabel: string;
  value?: string | null;
}
