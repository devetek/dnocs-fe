import { Card } from '@/shared/presentation/atoms/Card';
import { SearchInput } from '@/shared/presentation/atoms/SearchInput';

import { useFilter } from '../../-model/filter';

export default function FilterBar() {
  const { searchQuery, setSearchQuery, setPagination } = useFilter();

  const elMainFilter = (
    <div className="flex flex-wrap gap-4 lg:gap-6">
      <div className="flex flex-row items-center gap-2"></div>
    </div>
  );

  return (
    <div>
      <Card className="mb-6">
        <div className="py-2 px-4 flex flex-wrap gap-2 lg:gap-6 justify-between">
          {elMainFilter}

          <SearchInput
            defaultValue={searchQuery}
            onEnter={(value) => {
              setSearchQuery(value);
              setPagination(1);
            }}
          />
        </div>
      </Card>
    </div>
  );
}
