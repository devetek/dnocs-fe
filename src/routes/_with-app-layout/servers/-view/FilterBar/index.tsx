import { ArrowLeftRightIcon, Grid2X2Icon, RefreshCwIcon, Rows3Icon } from 'lucide-react';

import { useDevetekTranslations } from '@/services/i18n';

import { Button } from '@/shared/presentation/atoms/ButtonV2';
import { Card } from '@/shared/presentation/atoms/Card';
import SearchCollapsible from '@/shared/presentation/atoms/SearchCollapsible';
import SearchKeywordBadge from '@/shared/presentation/atoms/SearchKeywordBadge';
import { buildSegmentedControl } from '@/widgets/ui-atomic-builder/atom-segmented-control';

import { useEmit } from '../../-model/events';
import { useFilterModel } from '../../-model/filters';

const ViewModeSO = buildSegmentedControl<'auto' | 'list' | 'grid'>({
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
  const { viewMode, setViewMode } = useFilterModel();

  return (
    <ViewModeSO
      activeItemId={viewMode}
      onClickOption={(newViewMode) => setViewMode(newViewMode)}
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
      onClick={() => emit('@resources::servers/servers-refresh', null)}
    >
      <RefreshCwIcon />
    </Button>
  );
};

const SlotSearch = () => {
  const t = useDevetekTranslations();
  const { searchQuery, setSearchQuery, setPagination } = useFilterModel();

  return (
    <SearchCollapsible
      initialValue={searchQuery}
      onSubmit={(input) => {
        setPagination(1);
        setSearchQuery(input);
      }}
      onClickClear={() => {
        setPagination(1);
        setSearchQuery('');
      }}
      placeholderText={t('common.terms.searchPlaceholder')}
    />
  );
};

const SlotKeywordBadge = () => {
  const { searchQuery, setSearchQuery, setPagination } = useFilterModel();

  return (
    <SearchKeywordBadge
      keyword={searchQuery}
      onClear={() => {
        setPagination(1);
        setSearchQuery('');
      }}
    />
  );
};

export default function MainFilter() {
  return (
    <>
      <Card className="bg-card/30 rounded-xl p-1.5 grid grid-cols-[1fr_auto] gap-x-2">
        <div className="flex items-center gap-2 flex-wrap">
          <SlotSearch />
        </div>

        <div className="flex items-center gap-x-1">
          <SlotRefresh />
          <SlotViewMode />
        </div>
      </Card>
      <SlotKeywordBadge />
    </>
  );
}
