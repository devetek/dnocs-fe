import type { LucideProps } from 'lucide-react';

import type {
  LoggingRichCaddyLb,
  SchemaLoggingRichCaddyLbParts,
} from '@/entities/logging-rich/caddy-lb/rules/schema';

export interface TimelineProps {
  timeline: LoggingRichCaddyLb[];
}

export interface TimelineItemDetailsProps {
  timelineItem: LoggingRichCaddyLb;

  showTechnicals?: boolean;
  onClickViewTechnicals?: () => void;
}

export interface TimelineItemAdvancedCardProps {
  timelineItem: LoggingRichCaddyLb;
}

export type UAIconProps = LucideProps & {
  $ua: SchemaLoggingRichCaddyLbParts.UserAgent;
};
