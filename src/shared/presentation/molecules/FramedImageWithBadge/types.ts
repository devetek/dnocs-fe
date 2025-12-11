import type { ComponentType } from 'react';

export interface FramedImageWithBadgeProps {
  classNameWrapper?: string;
  classNameImage?: string;
  classNameBadge?: string;
  tooltipMessage?: string;
  sizeUnit?: SizeUnit;
  image: string | ComponentType<{ className?: string }>;
  badge?: ComponentType<{ className?: string }>;
  badgeTooltipMessage?: string;
}

export type SizeUnit = 14 | 12 | 9;

export interface ParsedSizeUnit {
  cnWrapperSize: string;
  cnImageSize: string;
  cnBadgeSize: string;
}
