import { AdapterServerFromDto } from '@/entities/server/adapter';

import { ApiServer } from '@/shared/api';
import { useAdapter } from '@/shared/libs/api-client';
import buildSelector from '@/shared/libs/react-factories/buildSelector';

import type { FileManagerSidepanelProps as Props } from '../rules/types';

export const [CommonModelProvider, useCommonModel] = buildSelector(
  'FileManagerSidepanelCommonModel',
)((props: Props) => {
  const { serverId, onPreviewFile } = props;

  const [responseGetServerDetail] = ApiServer.Detail.$Id.useGet({
    serverId,
  });

  const serverDetail = useAdapter(responseGetServerDetail, (raw) =>
    AdapterServerFromDto.toMinimal(raw).unwrap(),
  );

  return {
    serverId,
    serverDetail,
    onPreviewFile,
  };
});
