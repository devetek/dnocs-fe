import type { ComponentType } from 'react';

import type { LucideProps } from 'lucide-react';

export interface LoadBalancerStatusMetadata {
  icon: ComponentType<LucideProps>;
  color: string;
  i18n: {
    statusLabel: string;
  };
}

export interface LoadBalancerWebserver {
  icon: ComponentType<LucideProps>;
  i18n: {
    brandName: string;
  };
}

export interface LoadBalancerFeature {
  logoSrc: string;
  i18n: {
    label: string;
  };
}
