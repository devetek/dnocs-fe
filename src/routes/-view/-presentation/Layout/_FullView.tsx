import { createScopeForSlot, extractSlots } from '@/shared/libs/react-children';
import { cn } from '@/shared/libs/tailwind/cn';

import type {
  LayoutAreaMainProps as AreaMainProps,
  LayoutAreaSideProps as AreaSideProps,
  LayoutProps as Props,
} from './types';

const slotted = createScopeForSlot('!routes/Landing/LayoutFullView');

export default function LayoutFullView(props: Props) {
  const { children, className, ...rest } = props;

  const [slotAreaMain, slotAreaSide] = extractSlots(
    children,
    LayoutFullView.AreaMain,
    LayoutFullView.AreaSide,
  );

  const cnWrapper = cn(
    'w-svw h-svh bg-background',
    'grid grid-cols-[minmax(0,7.2fr)_minmax(0,2.8fr)] gap-x-2',
    className,
  );

  const cnAside = cn('w-full h-full items-center justify-center flex');

  return (
    <div {...rest} className={cnWrapper}>
      <div className="w-full h-full">{slotAreaMain}</div>
      <div className={cnAside}>{slotAreaSide}</div>
    </div>
  );
}

LayoutFullView.AreaMain = slotted('AreaMain', (props: AreaMainProps) => {
  const { classNameContentWrapper, children } = props;

  const cnContentWrapper = cn('h-full', classNameContentWrapper);

  return (
    <div className="h-svh">
      <div className={cnContentWrapper}>{children}</div>
    </div>
  );
});

LayoutFullView.AreaSide = slotted('AreaSide', (props: AreaSideProps) => {
  const { children } = props;

  return <div className="p-2">{children}</div>;
});
