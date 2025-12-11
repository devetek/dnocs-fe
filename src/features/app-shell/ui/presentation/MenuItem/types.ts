import type { ReactNode } from 'react';

import type { LucideProps } from 'lucide-react';

export interface MenuItemProps {
  active?: boolean;
  collapsed?: boolean;
  icon: (props: LucideProps) => ReactNode;
  title: string;
  url: string;
  chevron?: MenuItemChevron | null;
  onClickMenuItem?: () => void;
}

export interface MenuItemChevron {
  onClick: () => void;
  isOpened: boolean;
}

export interface LinkWrapperProps {
  className?: string;
  url: string;
  children: ReactNode;
  onClick?: () => void;
}
