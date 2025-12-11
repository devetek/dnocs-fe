import type { ReactNode, Ref } from 'react';

import type { LucideProps } from 'lucide-react';

export interface ToolbarButtonGroupProps {
  actions: Action[];
}

export interface Action {
  ref?: Ref<HTMLButtonElement | null>;
  icon: (props: LucideProps) => ReactNode;
  iconColor?: 'normal' | 'danger';
  isActive?: boolean;
  isDisabled?: boolean;
  onClick?: () => void;
}
