import type { ReactNode } from 'react';

import { cn } from '@/shared/libs/tailwind/cn';

interface BaseProps {
  className?: string;
  children?: ReactNode;
}

export default function ProfileDetailLayout({
  className,
  children,
}: BaseProps) {
  const cnRoot = cn(
    'grid grid-cols-1 xl:grid-cols-[1fr_0.45fr] gap-4',
    className,
  );

  return <div className={cnRoot}>{children}</div>;
}

ProfileDetailLayout.Main = function ProfileDetailLayoutMain(props: BaseProps) {
  const { className, children } = props;

  const cnRoot = cn('order-2 xl:order-1 flex flex-col gap-4', className);

  return <div className={cnRoot}>{children}</div>;
};

ProfileDetailLayout.Aside = function ProfileDetailLayoutAside(
  props: BaseProps,
) {
  const { className, children } = props;

  const cnRoot = cn('order-1 xl:order-2', className);

  return <div className={cnRoot}>{children}</div>;
};
