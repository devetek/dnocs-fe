import type { ReactNode } from 'react';

export interface ItemStatusLogModalProps {
  logTopicTitle: string;
  logTopicMessage: string;

  mainLogs: ReactNode;
  additionalLogs?: ReactNode;
}
