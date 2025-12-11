import type { ReactNode } from 'react';

interface LayoutBaseProps {
  className?: string;
  children: ReactNode;
}

export interface LayoutProps extends LayoutBaseProps {
  mode: 'expanded' | 'collapsed';
}

export type LayoutHeaderProps = LayoutBaseProps;

export type LayoutSidebarProps = LayoutBaseProps;

export type LayoutToolbarProps = LayoutBaseProps;

export type LayoutContentProps = LayoutBaseProps;
