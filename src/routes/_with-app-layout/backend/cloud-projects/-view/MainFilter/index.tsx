import { ArrowLeftRightIcon, Grid2X2Icon, LinkIcon, Rows3Icon } from 'lucide-react';

import { useCloudProjectCreateModal } from '@/features/cloud-project-create-modal';

import { Button } from '@/shared/presentation/atoms/Button';
import { Card } from '@/shared/presentation/atoms/Card';
import SearchCollapsible from '@/shared/presentation/atoms/SearchCollapsible';
import { buildSegmentedControl } from '@/widgets/ui-atomic-builder/atom-segmented-control';

import { useCloudData } from '../../-model/cloud-data';
import { useFilter } from '../../-model/filters';

type ViewMode = 'auto' | 'list' | 'grid';

const ViewModeSO = buildSegmentedControl<ViewMode>({
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
  const { viewMode, setViewMode } = useFilter();

  return (
    <ViewModeSO
      activeItemId={viewMode}
      onClickOption={(newViewMode) => setViewMode(newViewMode)}
    />
  );
};

const SlotSearch = () => {
  const { searchQuery, setSearchQuery, setPagination } = useFilter();

  return (
    <SearchCollapsible
      initialValue={searchQuery}
      onSubmit={(input) => {
        setSearchQuery(input);
        setPagination(1);
      }}
      onClickClear={() => {
        setSearchQuery('');
        setPagination(1);
      }}
      placeholderText="Search cloud accounts..."
    />
  );
};

const SlotConnect = () => {
  const { refresh } = useCloudData();
  const [openCreationModal] = useCloudProjectCreateModal();

  return (
    <Button
      size="sm"
      onClick={() =>
        openCreationModal({
          onSubmitSuccess: () => {
            refresh();
          },
        })
      }
    >
      <LinkIcon className="w-4 h-4 mr-1.5" />
      Connect
    </Button>
  );
};

export default function MainFilter() {
  return (
    <Card className="bg-card/30 rounded-xl p-1.5 grid grid-cols-[1fr_auto] gap-x-2">
      <div className="flex items-center">
        <SlotSearch />
      </div>

      <div className="flex items-center gap-2">
        <SlotViewMode />
        <SlotConnect />
      </div>
    </Card>
  );
}
