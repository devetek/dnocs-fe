import { useMemo } from 'react';

import { useDevetekTranslations } from '@/services/i18n';

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

    const t = useDevetekTranslations();

    const mappedOptions = useMemo((): Array<SegmentedControlOption<Id>> => {
      return options.map((option) => {
        const { tooltipI18n, ...rest } = option;

        let tooltipText: string | undefined;

        if (tooltipI18n) {
          tooltipText = t(tooltipI18n);
        }

        return {
          ...rest,
          tooltipText,
        };
      });
    }, [t]);

    return (
      <SegmentedControl
        options={mappedOptions}
        activeItemId={activeItemId}
        onClickOption={onClickOption}
      />
    );
  };
}
