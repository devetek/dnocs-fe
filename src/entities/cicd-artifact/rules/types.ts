import type { ReactNode } from 'react';

import type { LucideProps } from 'lucide-react';

export interface CicdArtifactStatusMetadata {
  icon: (props: LucideProps) => ReactNode;
  color: string;
  i18n: {
    statusLabel: string;
  };
}
