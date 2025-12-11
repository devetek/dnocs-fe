import type { ReactNode } from 'react';

type Icon = (props: { className?: string }) => ReactNode;

export interface PageHeaderProps {
  classNameStatusIconItem?: string;

  title: ReactNode;
  description?: ReactNode;
  statuses?: PageHeaderStatuses;
  rightAppend?: ReactNode;
  heroIcon?: Icon;
  footnote?: ReactNode;
  footnoteAs?: 'div' | 'p';
  headnote?: ReactNode;
  headnoteAs?: 'div' | 'p';
}

export interface HeaderItemDropdownProps {
  classNameWrapper?: string;
  classNameText?: string;
  icon: Icon;
  text: ReactNode;
  dropdownItems: PhsDropdownItem[];
}

export type PageHeaderStatuses = Array<PhsStatus | PhsDropdown | PhsSeparator>;

export interface PhsSeparator {
  kind: 'separator';
}

export interface PhsStatus {
  kind: 'status';
  icon: Icon;
  text: ReactNode;
}

export interface PhsDropdown {
  kind: 'dropdown';
  icon: Icon;
  text: ReactNode;
  dropdownItems: PhsDropdownItem[];
}

export interface PhsDropdownItem {
  label: ReactNode;
  isActive?: boolean;
  onClick?: () => void;
}
