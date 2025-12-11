import type { ReactNode } from 'react';

import { iife } from '@/shared/libs/browser/iife';
import { useBreakpoint } from '@/shared/libs/react-hooks/useBreakpoint';
import { cn } from '@/shared/libs/tailwind/cn';

import { SidebarStoreProvider, useSidebarStore } from '../../model/sidebar';

import DesktopSidebar from './_DesktopSidebar';
import Mobile from './_Mobile';

interface Props {
  children: ReactNode;
}

const AppLayoutContent = (props: Props) => {
  const { children } = props;

  const { isCollapsed } = useSidebarStore();

  const isDesktop = useBreakpoint('md', true);

  const cnContent = cn(
    'min-w-[calc(100%_-_280px)] transition-all pt-16 md:pt-0 md:ml-[280px]',
  );

  const contentMarginLeft = iife(() => {
    if (!isDesktop) return 0;

    return isCollapsed ? 96 : 280;
  });

  const sidebarWidth = isCollapsed ? 96 : 280;

  return (
    <main className="relative">
      {isDesktop ? (
        <aside
          className="h-svh fixed"
          data-collapsed={isCollapsed}
          style={{ width: sidebarWidth }}
        >
          <DesktopSidebar />
        </aside>
      ) : (
        <header className="w-full h-16 absolute top-0">
          <Mobile />
        </header>
      )}
      <div className={cnContent} style={{ marginLeft: contentMarginLeft }}>
        <article className="max-w-[1280px] m-auto">{children}</article>
      </div>
    </main>
  );
};

export default function AppLayout(props: Props) {
  const { children } = props;

  return (
    <SidebarStoreProvider>
      <AppLayoutContent>{children}</AppLayoutContent>
    </SidebarStoreProvider>
  );
}
