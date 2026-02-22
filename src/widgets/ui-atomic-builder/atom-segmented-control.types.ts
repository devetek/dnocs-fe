import type { SegmentedControlOption } from '@/shared/presentation/atoms/SegmentedControl/types';

type Option<Id extends string> = Omit<
  SegmentedControlOption<Id>,
  'tooltipText'
> & {
  tooltipI18n?: string;
};

export interface BuildSegmentedControlParams<Id extends string> {
  options: Array<Option<Id>>;
}

export interface SegmentedControlDerivedProps<Id extends string> {
  activeItemId: Id;
  onClickOption?: (id: Id) => void;
}
