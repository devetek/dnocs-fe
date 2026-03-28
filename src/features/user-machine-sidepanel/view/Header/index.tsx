import { Spinner } from '@/shared/presentation/atoms/Spinner';
import { IconServer } from '@/shared/presentation/icons';

import { useCommonModel } from '../../model/common';

const ServerName = () => {
  const [serverId, serverDetail, serverUsers] = useCommonModel((s) => [
    s.serverId,
    s.serverDetail,
    s.serverUsers,
  ]);

  if (
    serverDetail.$status === 'initial' ||
    serverDetail.$status === 'loading'
  ) {
    return <Spinner />;
  }

  if (serverDetail.$status === 'failed') {
    return `{${serverId}}`;
  }

  console.log('serverUsersserverUsers', serverUsers);

  return serverDetail.hostname;
};

export default function Header() {
  return (
    <header className="px-4 py-3 w-[160px] shrink-0 flex flex-col gap-x-2">
      <h3 className="text-lg font-bold">User Manager</h3>
      <h6 className="text-sm text-primary/70 gap-1 flex items-center overflow-hidden">
        <IconServer className="size-4" />
        <p className="line-clamp-1">
          <ServerName />
        </p>
      </h6>
    </header>
  );
}
