import type { ReactNode } from 'react';

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export interface BreadcrumbItem {
  text: ReactNode;
  url?: string;
}
