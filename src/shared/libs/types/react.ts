import type { ReactNode } from 'react';

export type WithChildren<P = unknown, C = ReactNode> = P & {
  children: C;
};

export type MayWithChildren<P = unknown, C = ReactNode> = P & {
  children?: C;
};
