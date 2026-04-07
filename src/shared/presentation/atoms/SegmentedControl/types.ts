import type { LucideIcon } from 'lucide-react';

export interface SegmentedControlProps<Id extends string> {
  options: Array<SegmentedControlOption<Id>>;
  segmentSizing?: 'default' | 'uniform';

  activeItemId: Id;
  onClickOption?: (id: Id) => void;
}

export interface SegmentedControlOption<Id extends string> {
  id: Id;
  icon?: LucideIcon;
  text?: string;
  tooltipText?: string;
}
