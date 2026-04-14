import { ArrowLeftRightIcon, Grid2X2Icon, RefreshCwIcon, Rows3Icon } from 'lucide-react';

import { useDevetekTranslations } from '@/services/i18n';

import { Button } from '@/shared/presentation/atoms/ButtonV2';
import { Card } from '@/shared/presentation/atoms/Card';
import SearchCollapsible from '@/shared/presentation/atoms/SearchCollapsible';
import SearchKeywordBadge from '@/shared/presentation/atoms/SearchKeywordBadge';
import { buildSegmentedControl } from '@/widgets/ui-atomic-builder/atom-segmented-control';

import { useEmit } from '../../-models/events';
import { useFilterModel } from '../../-models/filters';
import type { FilterRules } from '../../-rules';

const ViewModeSO = buildSegmentedControl<FilterRules.ViewMode>({
  options: [
    {
      id: 'auto',
      icon: ArrowLeftRightIcon,
      tooltipI18n: 'common.terms.automaticView',
    },
    {
      id: 'list',
      icon: Rows3Icon,
      tooltipI18n: 'common.terms.cardListView',
    },
    {
      id: 'grid',
      icon: Grid2X2Icon,
      tooltipI18n: 'common.terms.cardGridView',
    },
  ],
});

const SlotViewMode = () => {
  const emit = useEmit();
  const [viewMode] = useFilterModel((s) => [s.viewMode]);

  return (
    <ViewModeSO
      activeItemId={viewMode}
      onClickOption={(newViewMode) => {
        emit('@load-balancers/filters/view-mode--change', newViewMode);
      }}
    />
  );
};

const SlotSearchCollapsible = () => {
  const t = useDevetekTranslations();

  const emit = useEmit();
  const [searchQuery] = useFilterModel((s) => [s.searchQuery]);

  const handleSearch = (input: string) => {
    emit('@load-balancers/filters/search--input', input);
  };

  const handleClear = () => {
    emit('@load-balancers/filters/search--input');
  };

  return (
    <SearchCollapsible
      initialValue={searchQuery}
      onSubmit={handleSearch}
      onClickClear={handleClear}
      placeholderText={t('common.terms.searchPlaceholder')}
    />
  );
};

const SlotKeywordBadge = () => {
  const emit = useEmit();
  const [searchQuery] = useFilterModel((s) => [s.searchQuery]);

  return (
    <SearchKeywordBadge
      keyword={searchQuery}
      onClear={() => emit('@load-balancers/filters/search--input')}
    />
  );
};

const SlotRefresh = () => {
  const emit = useEmit();

  return (
    <Button
      size="icon-sm"
      buttonColor="secondary"
      buttonStyle="ghost"
      onClick={() => emit('@load-balancers/data--refresh', null)}
    >
      <RefreshCwIcon />
    </Button>
  );
};

export default function MainFilter() {
  return (
    <>
      <Card className="bg-card/30 rounded-xl p-1.5 grid grid-cols-[1fr_auto] gap-x-2">
        <div className="flex items-center">
          <SlotSearchCollapsible />
        </div>

        <div className="flex items-center">
          <SlotRefresh />
          <SlotViewMode />
        </div>
      </Card>
      <SlotKeywordBadge />
    </>
  );
}
