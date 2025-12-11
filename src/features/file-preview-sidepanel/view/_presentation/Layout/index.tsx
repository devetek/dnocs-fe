import SidepanelLayout from '@/services/sidepanel/ui/presentation/Layout/General';

import { cn } from '@/shared/libs/tailwind/cn';

import type { LayoutBaseProps as Props } from './types';

export default function FilePreviewSidepanelLayout(props: Props) {
  const { children, className } = props;

  const cnLayout = cn(
    'w-full grid grid-rows-[auto_1fr] bg-background overflow-hidden',
    className,
  );

  const cnLayoutFrameWrapper = cn('w-[90vw] md:w-[80vw] lg:w-[70vw]');

  const cnLayoutFrame = cn('w-full max-w-full');

  return (
    <SidepanelLayout
      classNameFrameWrapper={cnLayoutFrameWrapper}
      classNameFrame={cnLayoutFrame}
      className={cnLayout}
    >
      <SidepanelLayout.CloseButton position="left" icon="back" />

      {children}
    </SidepanelLayout>
  );
}

FilePreviewSidepanelLayout.Header = function Header(props: Props) {
  const { children, className } = props;

  const cnLayout = cn(
    'w-full flex flex-col p-4 pt-3 pl-16 overflow-hidden',
    className,
  );

  return <div className={cnLayout}>{children}</div>;
};

FilePreviewSidepanelLayout.Content = function Header(props: Props) {
  const { children, className } = props;

  const cnLayout = cn(
    'w-full flex flex-col bg-card border-t overflow-hidden',
    className,
  );

  return <div className={cnLayout}>{children}</div>;
};
