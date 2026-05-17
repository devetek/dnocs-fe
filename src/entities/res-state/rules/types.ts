import type { ReactNode } from 'react';

import type { LucideProps } from 'lucide-react';

export interface ResStateConfig {
  colorGroup: string;
  icon: (props: LucideProps) => ReactNode;
  i18n: {
    statusLabel: string;
  };
}
