import { ApiSecret } from '@/shared/api';
import { useAdapter } from '@/shared/libs/api-client';
import buildSelector from '@/shared/libs/react-factories/buildSelector';

import { useSubscribe } from '../events';
import { useFilterModel } from '../filters';

export const [SshKeyDataModelProvider, useSshKeyDataModel] = buildSelector(
  'SshKeyDataModel',
)(() => {
  const { searchQuery, currentPage } = useFilterModel();

  const [response, refresh] = ApiSecret.SshKey.Find.useGet({
    page: currentPage,
    pageSize: 8,
    searchQuery,
  });

  useSubscribe('@ssh-keys/data--refresh', () => {
    refresh();
  });

  return {
    sshKeys: useAdapter(response, (raw) => ({
      list: raw.secrets ?? [],
      pagination: raw.pagination,
    })),
    refresh,
  };
});
