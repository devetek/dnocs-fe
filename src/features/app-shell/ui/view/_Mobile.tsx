import { useState } from 'react';

import { MenuIcon } from 'lucide-react';

import { Button } from '@/shared/presentation/atoms/Button';
import Drawer from '@/shared/presentation/atoms/Drawer';

import BrandLogo from '../presentation/BrandLogo';

import Footer from './Footer';
import MenuTree from './MenuTree';
import Teams from './Teams';
import UserPanel from './UserPanel';

export default function Mobile() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen((value) => !value);
  };

  return (
    <>
      <div className="p-2 grid grid-cols-[1fr_auto_1fr]">
        <div className="flex items-center">
          <Button variant="ghost" onClick={toggleSidebar}>
            <MenuIcon className="size-8" />
          </Button>
        </div>

        <div />

        <div className="flex items-center justify-end">
          <BrandLogo />
        </div>
      </div>

      <Drawer onClickOverlay={toggleSidebar}>
        {sidebarOpen && (
          <Drawer.Frame>
            <div className="h-full grid grid-rows-[auto_1fr_auto] py-2 pt-1">
              <div className="p-4 pt-2">
                <Teams />
              </div>

              <MenuTree onClickMenuItem={toggleSidebar} />

              <div className="flex flex-col items-center px-4 py-1">
                <UserPanel />
                <Footer />
              </div>
            </div>
          </Drawer.Frame>
        )}
      </Drawer>
    </>
  );
}
