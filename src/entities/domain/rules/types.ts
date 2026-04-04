import type { ComponentType } from 'react';

import type { LucideProps } from 'lucide-react';

export interface DomainProvider {
  icon: ComponentType<LucideProps>;
  i18n: {
    brandName: string;
  };
}
