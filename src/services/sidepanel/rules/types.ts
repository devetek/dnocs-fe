import type { ReactNode } from 'react';

export interface SidepanelPayload {
  content: ReactNode;
}

export type Sidepanel<P extends {}> = (props: P) => ReactNode;
