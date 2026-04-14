import type { CSSProperties, ReactNode } from 'react';

import type {
  Action,
  AdditionalsInfo,
  CommonIcon,
  MainContentStatus,
} from './shared';

export interface ResourceCardFullProps {
  classNameCardWrapper?: string;
  classNameCardInner?: string;
  onClickBody?: () => void;
  children: ReactNode;
}

export interface ResourceCardFullMainProps {
  className?: string;
  children: ReactNode;
}

export interface ResourceCardFullMainHeroProps {
  classNameWrapper?: string;
  classNameImage?: string;
  classNameBadge?: string;
  tooltipMessage?: string;
  image: string | CommonIcon;
  badge?: CommonIcon;
  badgeTooltipMessage?: string;
}

export interface ResourceCardFullMainContentProps {
  className?: string;
  title?: string;
  description?: string;
  status?: Array<false | MainContentStatus>;
  subStatus?: Array<false | MainContentStatus>;
  onClickTitle?: () => void;
}

export interface ResourceCardFullAdditionalsProps {
  className?: string;
  children: ReactNode;
  slots: 2 | 3;
}

export interface ResourceCardFullAdditionalsPrimeInfoProps {
  className?: string;
  title: string;
  titleIcon: CommonIcon;
  value?: ReactNode;
  valueTooltip?: string;
  onClick?: () => void;
}

export interface ResourceCardFullAdditionalsSecondaryInfosProps {
  infos: AdditionalsInfo[];
}

export interface ResourceCardFullAdditionalsPrimeInfoListProps {
  title: string;
  titleIcon: CommonIcon;
  infos: AdditionalsInfo[];
}

export interface ResourceCardFullFootnoteProps {
  className?: string;
  children: ReactNode;
}

export interface ResourceCardFullFootnoteItemProps {
  classNameWrapper?: string;
  classNameValueWrapper?: string;
  style?: {
    wrapper?: CSSProperties;
    valueWrapper?: CSSProperties;
  };
  label: string;
  labelIcon?: CommonIcon;
  value?: string | null;
  valueIcon?: CommonIcon;
  onClick?: () => void;
}

export interface ResourceCardFullActionsProps {
  className?: string;
  actions?: Array<false | Action>;
  visibleActionOnlyIcon?: boolean;
  labelMore?: string;
}

export interface ResourceCardFullExpandableProps {
  children: ReactNode;
}
