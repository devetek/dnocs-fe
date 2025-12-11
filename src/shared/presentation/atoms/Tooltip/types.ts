import type { ComponentProps, ReactNode } from 'react';

export type AsElement =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'div'
  | 'p'
  | 'span';

export interface TooltipProps<As extends AsElement> {
  as?: As;
  asProps?: ComponentProps<As>;
  className?: string;
  classNameTooltip?: string;
  children: ReactNode;
  message: ReactNode;
  position?: 'top' | 'right';
  delayMs?: number;
  gap?: number;
  passthrough?: boolean;
}

export interface TargetRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface TooltipRect {
  width: number;
  height: number;
}
