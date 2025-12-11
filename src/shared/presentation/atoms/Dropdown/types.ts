import type { ReactNode, RefObject } from 'react';

export interface DropdownProps {
  className?: string;

  refTarget: RefObject<HTMLElement | null>;

  gapInPx?: number;

  children: ReactNode;
  isOpen?: boolean;

  position?: 'top' | 'bottom';
  alignment?: 'left' | 'right';

  onClickOutside?: () => void;
}

export interface TargetRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface DropdownRect {
  x: number;
  y: number;
  width: number;
  height: number;
}
