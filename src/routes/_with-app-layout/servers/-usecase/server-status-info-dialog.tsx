import { useDevetekTranslations } from '@/services/i18n';

import type { ServerCard } from '@/entities/server/rules/schema';

import { useItemStatusLogModal } from '@/features/item-status-log-modal';

import useHandler from '@/shared/libs/react-hooks/useHandler';

export default function useServerStatusInfoDialogUsecase() {
  const [openItemStatusLogModal] = useItemStatusLogModal();

  const t = useDevetekTranslations();

  const handleUsecase = useHandler((serverInfo: ServerCard) => {
    openItemStatusLogModal({
      logTopicTitle: 'Server',
      logTopicMessage: `Server name: ${
        serverInfo.host.name || t('common.terms.unknown')
      }`,
      mainLogs: `Status: ${serverInfo.state.status}`,
      additionalLogs: serverInfo.state.message,
    });
  });

  return [handleUsecase] as const;
}
