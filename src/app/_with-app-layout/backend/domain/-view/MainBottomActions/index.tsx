import { buildPaginationV2 } from '@/widgets/ui-atomic-builder/atom-pagination-v2';

import { useFilterPagination } from '../../-usecase/use-filter-pagination';

const DomainPaginationControl = buildPaginationV2({});

export default function MainBottomActions() {
  const {
    currentPage,
    pagination,
    handleGoBack,
    handleGoForward,
    handlePageChange,
  } = useFilterPagination();

  if (pagination.$status !== 'success') return null;

  return (
    <div className="flex justify-end w-full">
      <DomainPaginationControl
        currentPage={currentPage}
        totalPage={pagination.totalPage}
        onClickBack={handleGoBack}
        onClickForward={handleGoForward}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
