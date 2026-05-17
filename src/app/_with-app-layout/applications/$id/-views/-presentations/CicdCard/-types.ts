import type { ComponentType, ReactNode } from 'react';

import type { LucideProps } from 'lucide-react';

export interface Props {
  cardAccent?: CardAccent;
  cardBadge?: Attribute;
  headerAttributes: Attribute[];
  aside?: ReactNode;

  children: ReactNode;
}

export interface ActionsProps {
  actions: Action[];
}

export interface FooterProps {
  className?: string;
  attributes: Attribute[];
}

export interface Attribute {
  id: string;
  color?: 'default' | 'success' | 'warning' | 'severe' | 'error';
  frame?: 'none' | 'solid';
  icon: ComponentType<LucideProps>;
  label: ReactNode;
  tooltipMessage?: string;
}

export type CardAccent =
  | 'none'
  | 'info'
  | 'success'
  | 'warning'
  | 'severe'
  | 'error';

export interface Action {
  id: string;
  icon: ComponentType<LucideProps>;
  label: string;

  isPrimary?: boolean;
  color?: 'neutral' | 'danger';

  onClick?: () => Promise<void>;
}
