import type { ReactNode } from 'react';

import { cn } from '@/shared/libs/tailwind/cn';

export interface CreationLayoutBaseProps {
  children: ReactNode;
  className?: string;
}

export interface CreationLayoutProps extends CreationLayoutBaseProps {
  expanded?: boolean;
}

export default function CreationLayout(props: CreationLayoutProps) {
  const { children, className, expanded } = props;

  const cnLayout = cn(
    'h-full flex flex-col not-lg:gap-4',
    expanded && 'lg:grid lg:grid-cols-[2fr_3.5fr]',
    className,
  );

  return <div className={cnLayout}>{children}</div>;
}

CreationLayout.Main = function CreationLayoutMain(
  props: CreationLayoutBaseProps,
) {
  const { children, className } = props;

  const cnMain = cn(className);

  return <div className={cnMain}>{children}</div>;
};

CreationLayout.Side = function CreationLayoutSide(
  props: CreationLayoutBaseProps,
) {
  const { children, className } = props;

  const cnSide = cn(
    'h-full bg-background lg:rounded-tl-md p-4 dark:p-5 border-t lg:border-l',
    className,
  );

  return <div className={cnSide}>{children}</div>;
};
