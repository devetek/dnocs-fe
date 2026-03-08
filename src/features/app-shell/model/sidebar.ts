import { useEffect, useState } from 'react';

import { isBrowser } from '@/shared/libs/browser/environment';
import { iife } from '@/shared/libs/browser/fn';
import { buildContext } from '@/shared/libs/react-factories/buildContext';
import { useBreakpoint } from '@/shared/libs/react-hooks/useBreakpoint';
import useHandler from '@/shared/libs/react-hooks/useHandler';

import { LS_SIDEBAR_COLLAPSED } from '../config';

export const [SidebarStoreProvider, useSidebarStore] = buildContext(
  'SidebarStore',
  () => {
    const [sidebarState, setSidebarState] = useState<
      'auto' | 'expanded' | 'collapsed'
    >(() => {
      if (!isBrowser()) return 'auto';

      const lsIsCollapsed = window.localStorage.getItem(LS_SIDEBAR_COLLAPSED);
      if (lsIsCollapsed == null) return 'auto';

      return lsIsCollapsed === 'true' ? 'collapsed' : 'expanded';
    });

    const isNudgeExpanded = useBreakpoint('xl', true);

    useEffect(() => {
      if (sidebarState === 'auto') return;

      window.localStorage.setItem(
        LS_SIDEBAR_COLLAPSED,
        sidebarState === 'collapsed' ? 'true' : 'false',
      );
    }, [sidebarState]);

    const toggleSidebarCollapsed = useHandler(() => {
      setSidebarState((value) =>
        value === 'collapsed' ? 'expanded' : 'collapsed',
      );
    });

    const isCollapsed = iife(() => {
      if (sidebarState === 'auto') {
        return !isNudgeExpanded;
      }

      return sidebarState === 'collapsed';
    });

    return {
      isCollapsed,
      sidebarState,
      setSidebarState,
      toggleSidebarCollapsed,
    };
  },
);
