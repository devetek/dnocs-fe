import type { ReactNode } from 'react';

import { cn } from '@/shared/libs/tailwind/cn';

interface BaseProps {
  className?: string;
  children: ReactNode;
}

export default function ModulesGridLayout(props: BaseProps) {
  const { className, children } = props;

  const cnRoot = cn('flex gap-2 flex-wrap', className);

  return <div className={cnRoot}>{children}</div>;
}

ModulesGridLayout.Item = function ModulesGridLayoutItem(props: BaseProps) {
  const { className, children } = props;

  const cnRoot = cn('basis-[calc(50%_-_0.5rem)]', className);

  return <div className={cnRoot}>{children}</div>;
};
