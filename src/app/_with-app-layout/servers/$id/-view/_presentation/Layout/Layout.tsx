import type { ReactNode } from 'react';

import { cn } from '@/shared/libs/tailwind/cn';

interface BaseProps {
  className?: string;
  children?: ReactNode;
}

export default function ServerDetailLayout({ className, children }: BaseProps) {
  const cnRoot = cn(
    'grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_minmax(0,0.45fr)] gap-4',
    className,
  );

  return <div className={cnRoot}>{children}</div>;
}

ServerDetailLayout.Main = function ServerDetailLayoutMain(props: BaseProps) {
  const { className, children } = props;

  const cnRoot = cn('order-2 xl:order-1 flex flex-col gap-4 min-w-0', className);

  return <div className={cnRoot}>{children}</div>;
};

ServerDetailLayout.Aside = function ServerDetailLayoutAside(props: BaseProps) {
  const { className, children } = props;

  const cnRoot = cn('order-1 xl:order-2 min-w-0', className);

  return <div className={cnRoot}>{children}</div>;
};
