import type { ReactNode } from 'react';

export interface EmptyStateProps {
  state: 'empty-artifact' | 'not-eligible' | 'error';
}

export interface CardWrapperProps {
  children: ReactNode;
}
