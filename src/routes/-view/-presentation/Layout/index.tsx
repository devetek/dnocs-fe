import { cn } from '@/shared/libs/tailwind/cn';

import LayoutFullView from './_FullView';
import LayoutResponsive from './_Responsive';
import type { LayoutMainWrapperCardProps } from './types';

function MainWrapperCard(props: LayoutMainWrapperCardProps) {
  const { children, className, ...rest } = props;

  const cnContentWrapper = cn(
    'h-full w-full bg-card border shadow rounded-2xl p-2 lg:p-4',
    'grid grid-rows-[auto_1fr_auto] gap-y-4',
  );

  const cnWrapper = cn('p-2 lg:p-6 h-svh w-full', className);

  return (
    <div {...rest} className={cnWrapper}>
      <div className={cnContentWrapper}>{children}</div>
    </div>
  );
}

const Layout = {
  FullView: LayoutFullView,
  Responsive: LayoutResponsive,
  MainWrapperCard,
};

export default Layout;
