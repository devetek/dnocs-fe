import type { ReactNode } from 'react';

export interface ToasterItem extends ToasterOptions {
  title?: ReactNode;
  message: ReactNode;
}

export interface ToasterOptions {
  variant?: ToasterVariant;
  duration?: number;
}

export type ToasterVariant = 'info' | 'success' | 'error' | 'warning';

export interface PushToast {
  (options: ToasterItem): void;
  (variant: ToasterVariant, message: string): void;
}
