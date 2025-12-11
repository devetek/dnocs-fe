import type { ReactNode } from 'react';

import type { LucideProps } from 'lucide-react';

export interface ServerStateMetadata {
  color: string;
  icon: (props: LucideProps) => ReactNode;
  i18n: {
    statusLabel: string;
  };
}

export interface ServerProviderMetadata {
  imageSrc: string;
  i18n: {
    label: string;
  };
}
