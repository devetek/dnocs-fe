import type { ComponentType } from 'react';

import type { LucideProps } from 'lucide-react';

export interface Props {
  announcements: Announcement | Announcement[];
}

export interface Announcement {
  accent?: 'none' | 'warning-solid' | 'warning-dashed' | 'critical';
  icon: 'info' | 'warning' | ComponentType<LucideProps>;
  id: string;
  title: string;
  description: string;

  ctaLabel?: string;
  ctaOnClick?: () => void | Promise<void>;
}
