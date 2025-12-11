import { useLogBrowserModal } from '@/features/log-browser-modal';

import {
  couple,
  guardedSelects,
} from '@/shared/libs/react-factories/guardedSelect';
import { FailedState } from '@/widgets/failed-state';

import { useAppDataModel } from '../../-model/app-data';
import { useAppLogsModel } from '../../-model/app-logs';
import { useEmit } from '../../-model/events';

import AppLogsSection from './_presentation/AppLogsSection';
import LogViewer from './_presentation/LogViewer';

const [guardLogs, useLogs] = guardedSelects({
  fallbackError: () => <FailedState.WallCentered />,
})(couple(useAppLogsModel, (s) => s.log));

const LogView = guardLogs(() => {
  const logBuffer = useLogs((s) => s);

  return (
    <div className="p-4 pt-0">
      <LogViewer logs={logBuffer.join('\n')} />
    </div>
  );
});

const [guardAppDetail, useAppDetail] = guardedSelects({
  initialIsLoading: true,
  fallbackLoading: () => null,
  fallbackError: () => null,
})(couple(useAppDataModel, (s) => s.appDetail));

export default guardAppDetail(function AppLogs() {
  const [logFilename, setLogFilename] = useAppLogsModel((s) => [
    s.logFilename,
    s.setLogFilename,
  ]);

  const appDetail = useAppDetail((s) => s);

  const [selectedServerId] = useAppDataModel((s) => [s.selectedServerId]);

  const [openLogBrowserModal] = useLogBrowserModal();

  const emit = useEmit();

  const handleClickLogs = () => {
    if (!selectedServerId || !appDetail.configDefs.lifecycle) return;

    openLogBrowserModal({
      appName: appDetail.configDefs.lifecycle.run.name,
      userName: appDetail.ownership.owner,
      machineID: Number(selectedServerId),
      onClickLogFile: (newLogFilename) => {
        setLogFilename(newLogFilename);
      },
    });
  };

  const handleClickDownloadLog = () => {
    emit('@applications::detail/logs-download', null);
  };

  return (
    // TODO: appDetail.configDefs.lifecycle can be null, need fallback UI
    <AppLogsSection
      selectedLogs={logFilename}
      onClickLogs={handleClickLogs}
      onClickDownloadLog={handleClickDownloadLog}
    >
      <LogView />
    </AppLogsSection>
  );
});
