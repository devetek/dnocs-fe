import type { ReactNode } from 'react';

export interface AppInformationLayoutFrameProps {
  children: ReactNode;
}

export interface AppInformationLayoutTwoColsProps {
  children: ReactNode;
}

export interface AppInformationLayoutRowProps {
  label: string;
  value: ReactNode;
  link?: string;
}
