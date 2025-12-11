import type { ReactNode } from 'react';

export interface DrawerProps {
  classNameOverlay?: string;
  classNameDrawer?: string;

  children: ReactNode;
  onClickOverlay?: () => void;

  position?: DrawerPosition;
  zIndex?: number;
}

export interface DrawerFrameProps {
  classNameWrapper?: string;
  classNameFrame?: string;

  children: ReactNode;
}

export interface DrawerSlotProps {
  className?: string;
  children: ReactNode;

  zIndex: number;
  currentIndex: number;
  listLength: number;
  position?: DrawerPosition;
  isVisible?: boolean;
}

export type DrawerPosition = 'left' | 'right';
