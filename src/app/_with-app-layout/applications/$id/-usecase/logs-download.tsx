import useHandler from '@/shared/libs/react-hooks/useHandler';

import { useAppLogsModel } from '../-model/app-logs';

export default function useLogsDownloadUsecase() {
  const [logMetadata, logFilename] = useAppLogsModel((s) => [
    s.logMetadata,
    s.logFilename,
  ]);

  const handleUsecase = useHandler(() => {
    const orgId = window.localStorage.getItem('organization_id');
    if (!logFilename || !logMetadata || !orgId) return;

    const { appName, serverId, userName } = logMetadata;

    const workdir = `/home/${userName}/logs/${appName}`;

    window.open(
      `${import.meta.env.VITE_BACKEND}/v1/folder/origin/${serverId}/download?workdir=${encodeURIComponent(workdir)}&file=${encodeURIComponent(logFilename)}&organization_id=${encodeURIComponent(orgId)}`,
    );
  });

  return [handleUsecase] as const;
}
