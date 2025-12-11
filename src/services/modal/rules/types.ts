import type { ReactNode } from 'react';

export interface ModalPayload {
  content: ReactNode;
}

export type Modal<P extends {}> = (props: P) => ReactNode;
