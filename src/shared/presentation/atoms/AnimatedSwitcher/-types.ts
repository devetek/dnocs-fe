import type { ComponentProps, JSX, ReactNode } from 'react';

export interface CarouselProps {
  activeIdent: string; // The key of the currently active child
  children: ReactNode; // The children to switch between
  duration?: number; // Duration of the animation in milliseconds
}

export type CarouselItemProps<As extends keyof JSX.IntrinsicElements> =
  ComponentProps<As> & {
    as: As;
    ident: string;
    children: ReactNode;
  };
