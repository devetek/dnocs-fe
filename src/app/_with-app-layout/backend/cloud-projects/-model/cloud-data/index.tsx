import { ApiCloud } from '@/shared/api';
import { useAdapter } from '@/shared/libs/api-client';
import buildSelector from '@/shared/libs/react-factories/buildSelector';

import { useSubscribe } from '../events';
import { useFilterModel } from '../filters';

export const [CloudDataModelProvider, useCloudDataModel] = buildSelector(
  'CloudDataModel',
)(() => {
  const { searchQuery, currentPage } = useFilterModel();

  const [response, refresh] = ApiCloud.Project.Find.useGet({
    page: currentPage,
    pageSize: 8,
    searchQuery,
  });

  useSubscribe('@cloud-projects/data--refresh', () => {
    refresh();
  });

  return {
    clouds: useAdapter(response, (raw) => ({
      list: raw.clouds ?? [],
      pagination: raw.pagination,
    })),
    refresh,
  };
});
