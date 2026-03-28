import { AdapterServerFromDto } from '@/entities/server/adapter';

import { ApiServer } from '@/shared/api';
import { useAdapter } from '@/shared/libs/api-client';
import buildSelector from '@/shared/libs/react-factories/buildSelector';

import type { UserMachineSidepanelProps as Props } from '../rules/types';

export const [CommonModelProvider, useCommonModel] = buildSelector(
  'UserMachineSidepanelCommonModel',
)((props: Props) => {
  const { serverId } = props;

  const [responseGetServerDetail] = ApiServer.Detail.$Id.useGet({
    serverId,
  });

    const [responseGetServerUsers] = ApiServer.Origin.$Id.User.useGet({
    serverId,
  });

  const serverDetail = useAdapter(responseGetServerDetail, (raw) =>
    AdapterServerFromDto.toMinimal(raw).unwrap(),
  );
  const serverUsers = responseGetServerUsers;

  return {
    serverId,
    serverDetail,
    serverUsers,
  };
});
