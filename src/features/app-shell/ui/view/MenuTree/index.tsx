import { useState } from 'react';

import { useLocation } from '@tanstack/react-router';

import { useDevetekTranslations } from '@/services/i18n';

import { isSSR } from '@/shared/libs/browser/environment';

import { MENUS } from '../../../config/menus';
import MenuItem from '../../presentation/MenuItem';

import type { MenuItemServersProps, MenuTreeProps } from './types';

const MenuItemWrapper = (props: MenuItemServersProps) => {
  const { menuItem, sidebarCollapsed, onClickMenuItem } = props;
  const { i18nKey, url, icon, iconActive, submenu } = menuItem;

  const t = useDevetekTranslations();

  const { pathname } = useLocation();

  const sanitizedUrl = url.replace(/\/v2/, '');
  const active = pathname.includes(sanitizedUrl);

  const [isFilterOpened, setIsFilterOpened] = useState(() => {
    if (!submenu || isSSR()) return false;
    return window.localStorage.getItem(`${i18nKey}::chevron`) === 'show';
  });

  const handleClickChevron = () => {
    window.localStorage.setItem(
      `${i18nKey}::chevron`,
      isFilterOpened ? 'hide' : 'show',
    );
    setIsFilterOpened((value) => !value);
  };

  return (
    <div className="flex flex-col">
      <MenuItem
        url={url}
        icon={active && iconActive ? iconActive : icon}
        title={t(i18nKey)}
        active={active}
        onClickMenuItem={onClickMenuItem}
        chevron={
          submenu
            ? {
                isOpened: isFilterOpened,
                onClick: handleClickChevron,
              }
            : undefined
        }
        collapsed={sidebarCollapsed}
      />

      {!sidebarCollapsed && isFilterOpened && submenu && (
        <div className="ml-3.5 pl-2 pt-1 border-l flex flex-col gap-1">
          <p className="pl-2 text-xs font-bold text-primary/70 pb-1">
            {t('common.terms.filters')}
          </p>

          {submenu.filters.map((filter) => {
            const { i18nKey: i18nKeyFilter, queryParam } = filter;

            const qs = new URLSearchParams(queryParam);

            const href = `${url}?${qs.toString()}`;

            return (
              <a
                key={i18nKeyFilter}
                className="cursor-pointer pl-2 text-sm italic hover:underline text-primary"
                href={href}
              >
                {t(i18nKeyFilter)}
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default function MenuTree(props: MenuTreeProps) {
  const { collapsed, onClickMenuItem } = props;

  const t = useDevetekTranslations();

  return (
    <div className="flex flex-col gap-6 overflow-y-auto">
      {MENUS.map((menuGroup) => {
        const { children: menuChildren, i18nKey } = menuGroup;

        return (
          <div
            key={i18nKey}
            className="flex flex-col gap-1 data-[collapsed=true]:items-center px-4 pb-2"
            data-collapsed={collapsed}
          >
            {!collapsed && (
              <p className="pl-1 pb-1 font-semibold text-xs text-primary/70">
                {t(i18nKey)}
              </p>
            )}

            {menuChildren.map((menuItem) => (
              <MenuItemWrapper
                key={menuItem.i18nKey}
                menuItem={menuItem}
                sidebarCollapsed={collapsed}
                onClickMenuItem={onClickMenuItem}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
}
