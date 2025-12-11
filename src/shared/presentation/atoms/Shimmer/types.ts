import type { ComponentProps } from 'react';

export type ComponentAs = 'div' | 'span';

export type ShimmerProps<As extends ComponentAs = 'div'> =
  ComponentProps<As> & {
    as?: As;
  };
