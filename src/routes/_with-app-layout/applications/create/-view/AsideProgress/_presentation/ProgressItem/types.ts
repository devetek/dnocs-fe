import type { ReactNode } from 'react';

export interface ProgressItemProps {
  status?: ProgressItemStatus;
  step: number;
  stepName: string;
  stepDescription: ReactNode;
}

export type ProgressItemStatus = 'todo' | 'in-progress' | 'checked';
