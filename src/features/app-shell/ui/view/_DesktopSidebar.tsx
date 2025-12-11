import { ClientOnly } from '@tanstack/react-router';

import { Button } from '@/shared/presentation/atoms/Button';
import {
  IconSidebarCollapse,
  IconSidebarExpand,
} from '@/shared/presentation/icons';

import { useSidebarStore } from '../../model/sidebar';
import BrandLogo from '../presentation/BrandLogo';

import Footer from './Footer';
import MenuTree from './MenuTree';
import Teams from './Teams';
import UserPanel from './UserPanel';

export default function Desktop() {
  const { isCollapsed, toggleSidebarCollapsed } = useSidebarStore();

  return (
    <div className="p-3 h-full overflow-hidden">
      <div
        className="bg-card/40 rounded-2xl h-full border shadow-xs grid grid-rows-[1fr_auto] data-[collapsed=true]:w-max overflow-hidden"
        data-collapsed={isCollapsed}
      >
        <div className="bg-card border-b rounded-2xl shadow-sm grid grid-rows-[auto_auto_1fr] overflow-hidden">
          <div
            className="pt-1 px-2 pb-3 flex items-center justify-between data-[collapsed=true]:justify-center transition-all"
            data-collapsed={isCollapsed}
          >
            <BrandLogo collapsed={isCollapsed} />

            {!isCollapsed ? (
              <Button
                className="bg-card p-2"
                size="sm"
                variant="outline"
                onClick={toggleSidebarCollapsed}
              >
                <IconSidebarCollapse />
              </Button>
            ) : (
              <Button
                className="p-1.5 shadow bg-card absolute -right-1"
                size="xs"
                variant="outline"
                onClick={toggleSidebarCollapsed}
              >
                <IconSidebarExpand />
              </Button>
            )}
          </div>

          <div className="pb-6 px-4">
            <ClientOnly>
              <Teams collapsed={isCollapsed} />
            </ClientOnly>
          </div>

          <MenuTree collapsed={isCollapsed} />

          <div className="px-4">
            <UserPanel collapsed={isCollapsed} />
          </div>
        </div>

        <div className="flex flex-col items-center p-1 overflow-hidden">
          <Footer isCollapsed={isCollapsed} />
        </div>
      </div>
    </div>
  );
}
