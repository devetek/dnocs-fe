import type { ReactNode } from 'react';

import type { LucideIcon } from 'lucide-react';

export interface FeedTimelineProps {
  children: ReactNode;
}

export interface FeedTimelineRowDatestampProps {
  timestamp: Date;
}

export interface FeedTimelineRowProps {
  classNameContentWrapper?: string;
  classNameIcon?: string;

  timestamp: Date;
  icon: LucideIcon;
  content: ReactNode;
  preformatContent?: boolean;
  isLast?: boolean;
}

export interface FeedTimelineRowDetailProps {
  children: ReactNode;

  classNameContent?: string;
}

export interface FeedTimelineRowGapProps {
  className?: string;
}
