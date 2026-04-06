import { ArrowLeftRightIcon, Grid2X2Icon, RefreshCwIcon, Rows3Icon } from 'lucide-react';

import { useDevetekTranslations } from '@/services/i18n';

import { Button } from '@/shared/presentation/atoms/ButtonV2';
import { Card } from '@/shared/presentation/atoms/Card';
import SearchCollapsible from '@/shared/presentation/atoms/SearchCollapsible';
import { Combobox } from '@/shared/presentation/molecules/Combobox';
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
      onClick={() => emit('@applications/application-refresh', null)}
    >
      <RefreshCwIcon />
    </Button>
  );
};

const SlotSearchCollapsible = () => {
  const t = useDevetekTranslations();

  const { searchQuery, setSearchQuery, setPagination } = useFilterModel();

  const handleSearch = (input: string) => {
    setPagination(1);
    setSearchQuery(input);
  };

  const handleClear = () => {
    setPagination(1);
    setSearchQuery('');
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

const SlotOwnership = () => {
  const t = useDevetekTranslations();
  const { setPagination, setOwnership, ownership } = useFilterModel();

  return (
    <Combobox
      classNameButton="bg-card w-40"
      placeholder={t('common.terms.ownership')}
      items={
        [
          {
            label: t('common.terms.mine'),
            value: 'mine',
          },
          {
            label: t('common.terms.teamResource'),
            value: 'team',
          },
        ] as const
      }
      value={ownership}
      onChange={(value) => {
        setPagination(1);
        setOwnership(value);
      }}
    />
  );
};

export default function MainFilter() {
  return (
    <Card className="bg-card/30 rounded-xl p-1.5 grid grid-cols-[1fr_auto] gap-x-2">
      <div className="flex items-center gap-2 flex-wrap">
        <SlotSearchCollapsible />
        <SlotOwnership />
      </div>

      <div className="flex items-center gap-x-1">
        <SlotRefresh />
        <SlotViewMode />
      </div>
    </Card>
  );
}
