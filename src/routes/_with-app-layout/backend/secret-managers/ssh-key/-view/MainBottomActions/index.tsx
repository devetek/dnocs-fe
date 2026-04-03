import { buildPaginationV2 } from '@/widgets/ui-atomic-builder/atom-pagination-v2';

import { useSshData } from '../../-model/ssh-data';
import { useFilter } from '../../-model/filters';

const SshPaginationControl = buildPaginationV2({});

export default function MainBottomActions() {
  const { response } = useSshData();
  const { pagination, setPagination } = useFilter();

  if (response.$status !== 'success') return null;

  const totalPage = response.pagination.total_page;

  if (totalPage <= 1) return null;

  return (
    <div className="flex justify-end w-full">
      <SshPaginationControl
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
