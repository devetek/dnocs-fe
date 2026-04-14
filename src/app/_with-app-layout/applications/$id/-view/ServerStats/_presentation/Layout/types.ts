import type { ReactNode } from 'react';

import type { LucideProps } from 'lucide-react';

export interface ServerStatsLayoutFrameProps {
  children: ReactNode;
}

export interface ServerStatsLayoutRowProps {
  children: ReactNode;
  icon: (props: LucideProps) => ReactNode;
  label: string;
}
