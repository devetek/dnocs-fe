import type { LucideIcon } from 'lucide-react';

export interface LoadBalancerStatusMetadata {
  icon: LucideIcon;
  color: string;
  i18n: {
    statusLabel: string;
  };
}

export interface LoadBalancerWebserver {
  icon: string | LucideIcon;
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
