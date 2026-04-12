import type { CSSProperties, ReactNode } from 'react';

import type { AdditionalsInfo, CommonIcon, MainContentStatus } from './shared';

export interface ResourceCardCompactProps {
  classNameCardWrapper?: string;
  classNameCardInner?: string;
  onClickBody?: () => void;
  children: ReactNode;
}

export interface ResourceCardCompactMainProps {
  className?: string;
  children: ReactNode;
}

export interface ResourceCardCompactMainHeroProps {
  classNameWrapper?: string;
  classNameImage?: string;
  classNameBadge?: string;
  tooltipMessage?: string;
  image: string | CommonIcon;
  badge?: CommonIcon;
  badgeTooltipMessage?: string;
}

export interface ResourceCardCompactMainContentProps {
  className?: string;
  title?: string;
  description?: string;
  status?: Array<false | MainContentStatus>;
  subStatus?: Array<false | MainContentStatus>;
}

export interface ResourceCardCompactFootnoteProps {
  className?: string;
  children: ReactNode;
}

export interface ResourceCardCompactFootnoteStatusIconsProps {
  classNameWrapper?: string;
  tooltipMessage?: string;
  icons: CommonIcon[];
  onClick?: () => void;
}

export interface ResourceCardCompactFootnoteItemProps {
  classNameWrapper?: string;
  classNameValueWrapper?: string;
  label?: string;
  value?: string | null;
  icon: CommonIcon;
  style?: {
    wrapper?: CSSProperties;
    valueWrapper?: CSSProperties;
  };
  onClick?: () => void;
}

export interface ResourceCardCompactSecondaryInfosProps {
  infos: AdditionalsInfo[];
}

export interface ResourceCardCompactTertiaryInfosProps {
  infos: AdditionalsInfo[];
}
