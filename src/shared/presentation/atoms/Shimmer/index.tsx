import type { RefObject } from 'react';

import { cn } from '@/shared/libs/tailwind/cn';

import type { ComponentAs, ShimmerProps } from './types';

export default function Shimmer<As extends ComponentAs = 'div'>(
  props: ShimmerProps<As>,
) {
  const { as: As = 'div', className, ref, ...rest } = props;

  const cnComponent = cn(
    'animate-pulse rounded bg-black/5 dark:bg-white/5',
    className,
  );

  return (
    <As
      className={cnComponent}
      ref={ref as RefObject<HTMLDivElement>}
      {...rest}
    />
  );
}
