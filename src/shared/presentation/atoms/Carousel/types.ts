import type { ReactNode } from 'react';

export interface CarouselProps {
  classNameWrapper?: string;
  classNameItems?: string;
  children: ReactNode;

  intervalMs?: number;
}

export interface CarouselItemProps {
  children: ReactNode;
}
