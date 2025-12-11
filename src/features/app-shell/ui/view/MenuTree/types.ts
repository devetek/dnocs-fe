import type { MenuItem } from '../../../rules/types';

export interface MenuTreeProps {
  collapsed?: boolean;
  onClickMenuItem?: () => void;
}

export interface MenuItemServersProps {
  menuItem: MenuItem;
  sidebarCollapsed?: boolean;
  onClickMenuItem?: () => void;
}
