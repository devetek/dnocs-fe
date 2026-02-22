import type { ReactNode } from 'react';

import type { FileRoutesByPath } from '@tanstack/react-router';
import type { LucideProps } from 'lucide-react';

export type KnownRoutes =
  | FileRoutesByPath[keyof FileRoutesByPath]['path']
  | `/v2${FileRoutesByPath[keyof FileRoutesByPath]['path']}`;

export interface MenuGroup {
  i18nKey: string;
  children: MenuItem[];
}

export interface MenuItem {
  id: string;
  icon: (props: LucideProps) => ReactNode;
  iconActive?: (props: LucideProps) => ReactNode;
  i18nKey: string;
  url: KnownRoutes;
  submenu?: MenuItemSubmenu;
}

export type MenuItemSubmenu = { type: 'filter'; filters: SubmenuFilter[] };

export interface SubmenuFilter {
  i18nKey: string;
  queryParam: Record<string, string>;
}

export interface TeamPopupItem {
  name: string;
  id: string;
}
