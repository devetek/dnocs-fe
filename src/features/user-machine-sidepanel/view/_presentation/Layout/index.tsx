import SidepanelLayout from '@/services/sidepanel/ui/presentation/Layout/General';

import { createScopeForSlot, extractSlots } from '@/shared/libs/react-children';
import { cn } from '@/shared/libs/tailwind/cn';

import type {
  LayoutContentProps,
  LayoutHeaderProps,
  LayoutProps,
  LayoutSidebarProps,
  LayoutToolbarProps,
} from './types';

const slotted = createScopeForSlot('##FileManagerSidepanel');

export default function FileManagerSidepanelLayout(props: LayoutProps) {
  const { children, className, mode } = props;

  const [slotHeader, slotSidebar, slotToolbar, slotContent] = extractSlots(
    children,
    FileManagerSidepanelLayout.Header,
    FileManagerSidepanelLayout.Sidebar,
    FileManagerSidepanelLayout.Toolbar,
    FileManagerSidepanelLayout.Content,
  );

  const cnLayoutFrameWrapper = cn(
    'w-[90vw] md:w-[90vw] lg:w-[80vw] xl:w-[70vw]',
  );

  const cnLayoutFrame = cn('w-full max-w-full');

  if (mode === 'expanded') {
    const cnLayout = cn(
      'w-full grid grid-cols-[300px_1fr] bg-background',
      className,
    );

    return (
      <SidepanelLayout
        classNameFrameWrapper={cnLayoutFrameWrapper}
        classNameFrame={cnLayoutFrame}
        className={cnLayout}
      >
        <SidepanelLayout.CloseButton />

        <aside className="h-full w-full overflow-hidden grid">
          {slotHeader}
          {slotSidebar}
        </aside>

        <div className="h-full w-full grid grid-rows-[auto_1fr] overflow-hidden">
          <div className="h-16 pr-16 w-full flex items-center">
            {slotToolbar}
          </div>

          <div className="border-l border-t rounded-tl-xl bg-card flex flex-col h-full overflow-hidden">
            {slotContent}
          </div>
        </div>
      </SidepanelLayout>
    );
  }

  const cnLayout = cn(
    'w-full grid grid-rows-[72px_auto_1fr] bg-background',
    className,
  );

  return (
    <SidepanelLayout
      classNameFrameWrapper={cnLayoutFrameWrapper}
      classNameFrame={cnLayoutFrame}
      className={cnLayout}
    >
      <SidepanelLayout.CloseButton />

      <div className="pr-16 w-full grid grid-cols-[1fr_auto] overflow-hidden">
        {slotHeader}
      </div>

      <div className="w-full px-2 flex overflow-hidden">{slotToolbar}</div>

      <div className="w-full h-full border-t rounded-tl-xl overflow-hidden">
        {slotContent}
      </div>
    </SidepanelLayout>
  );
}

FileManagerSidepanelLayout.Header = slotted(
  'Header',
  (props: LayoutHeaderProps) => {
    const { children } = props;

    return children;
  },
);

FileManagerSidepanelLayout.Sidebar = slotted(
  'Sidebar',
  (props: LayoutSidebarProps) => {
    const { children } = props;

    return children;
  },
);

FileManagerSidepanelLayout.Toolbar = slotted(
  'Toolbar',
  (props: LayoutToolbarProps) => {
    const { children } = props;

    return children;
  },
);

FileManagerSidepanelLayout.Content = slotted(
  'Content',
  (props: LayoutContentProps) => {
    const { children } = props;

    return children;
  },
);
