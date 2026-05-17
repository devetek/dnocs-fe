import type { ResStateStatus } from '../../rules/schema';

export interface IconProps {
  className?: string;
  status: ResStateStatus;
  colorless?: boolean;
}

export interface LabelProps {
  as?: 'div' | 'p' | 'span' | `h${1 | 2 | 3 | 4 | 5 | 6}`;
  className?: string;
  status: ResStateStatus;
  colorless?: boolean;
}

export interface ChipProps {
  as?: 'div' | 'p' | 'span' | `h${1 | 2 | 3 | 4 | 5 | 6}`;
  className?: string;
  status: ResStateStatus;
}
