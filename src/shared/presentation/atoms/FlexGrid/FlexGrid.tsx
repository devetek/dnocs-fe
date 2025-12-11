import type { ReactNode } from 'react';
import { Children, isValidElement } from 'react';

import { cn } from '@/shared/libs/tailwind/cn';

const CN_BASIS = `flex-[0_1] overflow-hidden`;
const CN_SZ_3 = `md:basis-[calc(33.333%_-_0.67rem)]`;
const CN_SZ_4 = `lg:basis-[calc(33.333%_-_0.8rem)] xl:basis-[calc(25%_-_0.8rem)]`;
const CN_SZ_5 = `md:basis-[calc(33.333%_-_0.335rem)] lg:basis-[calc(25%_-_0.8rem)] xl:basis-[calc(20%_-_0.8rem)]`;

interface Props {
  className?: string;
  children: ReactNode;
  gridItemsMax: 3 | 4 | 5;
}

export default function FlexGrid(props: Props) {
  const { className, children, gridItemsMax } = props;

  return (
    <div className={cn('flex flex-wrap gap-2 lg:gap-4 w-full', className)}>
      {Children.map(children, (child) => {
        if (!child || !isValidElement(child)) return null;

        const cnRoot = cn(CN_BASIS, {
          [CN_SZ_4]: gridItemsMax === 4,
          [CN_SZ_5]: gridItemsMax === 5,
          [CN_SZ_3]: gridItemsMax === 3,
          // Mobile-specific constraints: force 50% width on mobile,
          // reset basis on larger screens.
          'basis-[calc(50%_-_0.25rem)]': true,
          // "lg:basis-auto": true,
        });

        return (
          <div key={child.key} className={cnRoot}>
            {child}
          </div>
        );
      })}
    </div>
  );
}
