import { buildPaginationV2 } from '@/widgets/ui-atomic-builder/atom-pagination-v2';

import { useFilterModel } from '../../-model/filters';
import { useServersModel } from '../../-model/servers';

const ServerPaginationControl = buildPaginationV2({});

export default function MainBottomActions() {
  const serversState = useServersModel((s) => s);
  const { pagination, setPagination } = useFilterModel();

  if (serversState.$status !== 'success') return null;

  const totalPage = serversState.pagination.total_page;

  if (totalPage <= 1) return null;

  return (
    <div className="flex justify-end w-full">
      <ServerPaginationControl
        currentPage={pagination}
        totalPage={totalPage}
        onClickBack={() => setPagination(Math.max(1, pagination - 1))}
        onClickForward={() =>
          setPagination(Math.min(totalPage, pagination + 1))
        }
        onPageChange={(page) => setPagination(page)}
      />
    </div>
  );
}
