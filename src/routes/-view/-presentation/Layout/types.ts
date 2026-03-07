import type { ComponentProps, ReactNode } from 'react';

export interface LayoutProps extends ComponentProps<'div'> {
  className?: string;

  children: ReactNode;
}

export interface LayoutResponsiveProps extends LayoutProps {
  showForm?: boolean;
}

export interface LayoutAreaMainProps {
  classNameContentWrapper?: string;

  children: ReactNode;
}

export interface LayoutAreaSideProps {
  className?: string;

  children: ReactNode;
}

export interface LayoutMainWrapperCardProps {
  children: ReactNode;
  className?: string;
}
