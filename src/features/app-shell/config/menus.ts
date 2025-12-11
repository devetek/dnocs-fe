import {
  IconApp,
  IconAppActive,
  IconCloud,
  IconCloudActive,
  IconDatabase,
  IconDatabaseActive,
  IconDiscover,
  IconDiscoverActive,
  IconGlobe,
  IconGlobeActive,
  IconHome,
  IconHomeActive,
  IconLoadBalancer,
  IconLoadBalancerActive,
  IconLock,
  IconLockActive,
  IconServer,
  IconServerActive,
} from '@/shared/presentation/icons';

import type { MenuGroup } from '../rules/types';

export const MENUS: MenuGroup[] = [
  {
    i18nKey: 'sidebar.workspace',
    children: [
      {
        id: 'dashboard',
        icon: IconHome,
        iconActive: IconHomeActive,
        i18nKey: 'sidebar.dashboard',
        url: '/v2/dashboard',
      },
      {
        id: 'apps',
        icon: IconApp,
        iconActive: IconAppActive,
        i18nKey: 'sidebar.applications',
        url: '/v2/applications',
      },
      {
        id: 'servers',
        icon: IconServer,
        iconActive: IconServerActive,
        i18nKey: 'sidebar.servers',
        url: '/v2/servers',
        submenu: {
          type: 'filter',
          filters: [
            {
              i18nKey: 'sidebar.serversSubmenu.filterHasDb',
              queryParam: {
                has_modules: 'db',
              },
            },
            {
              i18nKey: 'sidebar.serversSubmenu.filterHasMemstore',
              queryParam: {
                has_modules: 'memstore',
              },
            },
          ],
        },
      },
    ],
  },
  {
    i18nKey: 'sidebar.backend',
    children: [
      {
        id: 'db',
        icon: IconDatabase,
        iconActive: IconDatabaseActive,
        i18nKey: 'sidebar.database',
        url: '/v2/backend/database',
      },
      {
        id: 'lb',
        icon: IconLoadBalancer,
        iconActive: IconLoadBalancerActive,
        i18nKey: 'sidebar.loadBalancers',
        url: '/router',
      },
      {
        id: 'ddns',
        icon: IconGlobe,
        iconActive: IconGlobeActive,
        i18nKey: 'sidebar.dDns',
        url: '/domain',
      },
      {
        id: 'cloudproj',
        icon: IconCloud,
        iconActive: IconCloudActive,
        i18nKey: 'sidebar.cloudProject',
        url: '/v2/backend/cloud-projects',
      },
      {
        id: 'secretmgr',
        icon: IconLock,
        iconActive: IconLockActive,
        i18nKey: 'sidebar.secretMgr',
        url: '/v2/secret-managers/ssh-key',
      },
    ],
  },
  {
    i18nKey: 'sidebar.explore',
    children: [
      {
        id: 'disco-servermod',
        icon: IconDiscover,
        iconActive: IconDiscoverActive,
        i18nKey: 'sidebar.serverModules',
        url: '/v2/discover/modules',
      },
    ],
  },
];
