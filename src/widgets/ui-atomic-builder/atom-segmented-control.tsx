import { useMemo } from 'react';

import SegmentedControl from '@/shared/presentation/atoms/SegmentedControl';
import type { SegmentedControlOption } from '@/shared/presentation/atoms/SegmentedControl/types';

import type {
  BuildSegmentedControlParams,
  SegmentedControlDerivedProps,
} from './atom-segmented-control.types';

export function buildSegmentedControl<Id extends string>(
  params: BuildSegmentedControlParams<Id>,
) {
  const { options } = params;

  return function SegmentedControlDerived(
    props: SegmentedControlDerivedProps<Id>,
  ) {
    const { activeItemId, onClickOption } = props;

    const mappedOptions = useMemo((): Array<SegmentedControlOption<Id>> => {
      return options.map((option) => {
        const { tooltipI18n: _tooltipI18n, ...rest } = option;

        return { ...rest };
      });
    }, []);

    return (
      <SegmentedControl
        options={mappedOptions}
        activeItemId={activeItemId}
        onClickOption={onClickOption}
      />
    );
  };
}
