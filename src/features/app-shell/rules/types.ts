import type { ReactNode } from 'react';

import type { LucideProps } from 'lucide-react';

export interface MenuGroup {
  i18nKey: string;
  children: MenuItem[];
}

export interface MenuItem {
  id: string;
  icon: (props: LucideProps) => ReactNode;
  iconActive?: (props: LucideProps) => ReactNode;
  i18nKey: string;
  url: string;
  submenu?: MenuItemSubmenu;
}

export type MenuItemSubmenu = { type: 'filter'; filters: SubmenuFilter[] };

export interface SubmenuFilter {
  i18nKey: string;
  queryParam: Record<string, string>;
}
