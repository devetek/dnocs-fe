import type { ServerCard } from '@/entities/server/rules/schema';

import { useServerEditSidepanel } from '@/features/server-edit-sidepanel';

import useHandler from '@/shared/libs/react-hooks/useHandler';

interface Params {
  onSuccess: () => void;
}

export default function useServerEditSidepanelUsecase(params: Params) {
  const { onSuccess } = params;

  const [openServerEditSidepanel] = useServerEditSidepanel();

  const handleUsecase = useHandler((server: ServerCard) => {
    openServerEditSidepanel({
      serverName: server.host.name,
      agent: {
        domain: server.agent.domain,
        httpPort: server.agent.httpPort,
      },
      serverAddress: server.host.address || '',
      serverId: server.id,
      ssh: {
        port: server.ssh.port,
        username: server.ssh.defaultUser,
      },
      onSuccess,
    });
  });

  return [handleUsecase] as const;
}
