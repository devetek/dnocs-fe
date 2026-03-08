import { createScopeForSlot, extractSlots } from '@/shared/libs/react-children';
import { cn } from '@/shared/libs/tailwind/cn';

import type {
  LayoutAreaMainProps as AreaMainProps,
  LayoutAreaSideProps as AreaSideProps,
  LayoutResponsiveProps as Props,
} from './types';

const slotted = createScopeForSlot('!routes/Landing/LayoutResponsive');

export default function LayoutResponsive(props: Props) {
  const { children, className, showForm, ...rest } = props;

  const [slotMain, slotForm] = extractSlots(
    children,
    LayoutResponsive.Main,
    LayoutResponsive.Form,
  );

  const cnWrapper = cn(
    'relative w-svw h-svh bg-background overflow-hidden',
    className,
  );

  const cnMain = cn('w-svw h-svh translate-0 transition-all ease-in-out', {
    '-translate-x-[400px] opacity-50 pointer-events-none select-none': showForm,
  });

  const cnAside = cn('w-full max-w-[400px] h-svh items-center justify-center', {
    hidden: !showForm,
    'absolute right-0 top-0 bottom-0': showForm,
  });

  return (
    <div {...rest} className={cnWrapper}>
      <div className={cnMain}>{slotMain}</div>
      <div className={cnAside}>{slotForm}</div>
    </div>
  );
}

LayoutResponsive.Main = slotted('Main', (props: AreaMainProps) => {
  const { classNameContentWrapper, children } = props;

  const cnContentWrapper = cn('h-full', classNameContentWrapper);

  return (
    <div className="h-svh">
      <div className={cnContentWrapper}>{children}</div>
    </div>
  );
});

LayoutResponsive.Form = slotted('Form', (props: AreaSideProps) => {
  const { children } = props;

  return (
    <div className="p-2 h-svh flex flex-col items-center justify-center">
      {children}
    </div>
  );
});
