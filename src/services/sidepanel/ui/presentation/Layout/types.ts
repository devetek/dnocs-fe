import type { ReactNode } from 'react';

export interface SidepanelLayoutGeneralProps {
  className?: string;
  classNameFrameWrapper?: string;
  classNameFrame?: string;
  children: ReactNode;
}

export interface SidepanelLayoutGeneralCloseButtonProps {
  position?: 'left' | 'right';
  icon?: 'close' | 'back';
}

export interface SidepanelLayoutGeneralTitleProps {
  className?: string;
  title: string;
  subtitle?: string;
  subtitleLoading?: boolean;
  hasCloseButton?: boolean;
}

export interface SidepanelLayoutGeneralContentProps {
  className?: string;
  children: ReactNode;
}

export interface SidepanelLayoutGeneralCtaProps {
  className?: string;
  children: ReactNode;
}
