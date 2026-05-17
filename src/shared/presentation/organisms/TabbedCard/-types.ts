import type { ComponentType, ReactNode } from 'react';

import type { LucideProps } from 'lucide-react';

export interface WithActionsProps {
  actions: Action[];
  items: TabItem[];
}

export interface TabItem {
  id: string;
  label: string;
  content: ReactNode;
}

export interface Action {
  isDisabled?: boolean;
  isLoading?: boolean;
  label: string;
  icon?: ComponentType<LucideProps>;
  tooltipMessage?: string;
  onClick: () => void;
}
