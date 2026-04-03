import { Card } from '@/shared/presentation/atoms/Card';
import { SearchInput } from '@/shared/presentation/atoms/SearchInput';

import { useFilter } from '../../-model/filters';

export default function FilterBar() {
  const { searchQuery, setSearchQuery, setPagination } = useFilter();

  return (
    <div>
      <Card className="mb-6">
        <div className="py-2 px-4 flex flex-wrap gap-2 lg:gap-6 justify-end">
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
