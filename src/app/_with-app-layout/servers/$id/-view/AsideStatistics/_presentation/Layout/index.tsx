import type { ReactNode } from 'react';

import { cn } from '@/shared/libs/tailwind/cn';

interface BaseProps {
  className?: string;
  children: ReactNode;
}

export default function AsideStatisticsLayout(props: BaseProps) {
  const { children, className } = props;

  const cnRoot = cn(
    'flex flex-col gap-2 xl:gap-4 sm:flex-row sm:flex-wrap xl:flex-col xl:flex-nowrap',
    className,
  );

  return <div className={cnRoot}>{children}</div>;
}

AsideStatisticsLayout.Item = function AsideStatisticsLayoutItem(
  props: BaseProps,
) {
  const { children, className } = props;

  const cnRoot = cn(
    ' sm:basis-[calc(50%_-_0.25rem)] md:basis-[calc(33.33%_-_0.34rem)] overflow-hidden xl:basis-none',
    className,
  );

  return <div className={cnRoot}>{children}</div>;
};
