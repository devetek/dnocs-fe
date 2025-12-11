import { useState } from 'react';

import { useDevetekTranslations } from '@/services/i18n';

import {
  couple,
  guardedSelects,
} from '@/shared/libs/react-factories/guardedSelect';
import { Card } from '@/shared/presentation/atoms/Card';
import { Pagination } from '@/shared/presentation/atoms/Pagination';
import { SearchInput } from '@/shared/presentation/atoms/SearchInput';
import { FailedState } from '@/widgets/failed-state';

import { useFilterModel } from '../../-model/filter';
import { useServiceDataModel } from '../../-model/service-data';

const FilterBar = () => {
  const { searchQuery, setSearchQuery, setPagination } = useFilterModel();

  const t = useDevetekTranslations();

  return (
    <Card className="mb-6 shadow-sm bg-card/40 rounded-xl">
      <div className="p-2 flex flex-wrap gap-2 lg:gap-6 justify-between">
        <SearchInput
          defaultValue={searchQuery}
          placeholder={t('common.terms.search')}
          onEnter={(value) => {
            setSearchQuery(value);
            setPagination(1);
          }}
        />
      </div>
    </Card>
  );
};

const [guard, useServices] = guardedSelects({
  fallbackError: () => <FailedState.WallCentered />,
})(couple(useServiceDataModel, (s) => s.services));

const PaginationArea = guard(() => {
  const { pagination, setPagination } = useFilterModel();
  const [totalPage] = useServices((s) => [s.pagination.total_page]);

  const [maxPage, setMaxPage] = useState(1);

  if (maxPage !== totalPage) {
    setMaxPage(totalPage);
  }

  return (
    <div className="flex justify-between items-center gap-2 overflow-auto">
      <div />

      <div>
        <Pagination
          currentPage={pagination}
          maxPage={maxPage}
          onPageChange={(newPage) => setPagination(newPage)}
        />
      </div>
    </div>
  );
});

export default function FilterArea() {
  return (
    <div className="flex flex-col">
      <FilterBar />
      <PaginationArea />
    </div>
  );
}
