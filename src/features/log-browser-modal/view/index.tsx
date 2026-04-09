import { ServerIcon } from 'lucide-react';

import { useModalEmit } from '@/services/modal/model/event';
import { ModalLayoutGeneral } from '@/services/modal/ui/presentation';

import { Button } from '@/shared/presentation/atoms/Button';
import { SearchInput } from '@/shared/presentation/atoms/SearchInput';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/presentation/atoms/Select';

import { LogListRepoProvider, useLogListRepo } from '../model/repo-log-list';
import type { LogBrowserModalProps } from '../model/types';

const Content = (props: LogBrowserModalProps) => {
  const { onClickLogFile, deploymentTargets } = props;

  const {
    searchQuery,
    setSearchQuery,
    logFiles,
    selectedMachineID,
    setSelectedMachineID,
  } = useLogListRepo();

  const emitModal = useModalEmit();

  const handleClickLogFile = (logFilename: string) => {
    return () => {
      emitModal('%%modal/close', null);
      onClickLogFile?.(logFilename);
    };
  };

  return (
    <div className="flex flex-col gap-3">
      {deploymentTargets && deploymentTargets.length > 1 && (
        <div className="flex flex-col gap-1.5">
          <p className="text-xs text-muted-foreground font-medium">Server</p>
          <Select
            value={String(selectedMachineID)}
            onValueChange={(val) => setSelectedMachineID(Number(val))}
          >
            <SelectTrigger className="w-full">
              <ServerIcon className="size-3.5 shrink-0" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {deploymentTargets.map((target) => (
                <SelectItem key={target.id} value={String(target.id)}>
                  {target.hostname}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      <SearchInput onEnter={setSearchQuery} defaultValue={searchQuery} />

      <div className="overflow-hidden border rounded-lg">
        <div className="flex flex-col overflow-y-auto max-h-96">
          {logFiles.map((logFile) => {
            return (
              <Button
                key={logFile.name}
                variant="secondary"
                className="bg-transparent rounded-none not-last:border-b"
                onClick={handleClickLogFile(logFile.name)}
              >
                {logFile.name}
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default function LogBrowserModal(props: LogBrowserModalProps) {
  const { appName } = props;

  return (
    <ModalLayoutGeneral maxWidth="400px">
      <ModalLayoutGeneral.Title
        canClickClose
        title="Log Browser"
        description={`For ${appName}`}
      />

      <ModalLayoutGeneral.Content>
        <LogListRepoProvider {...props}>
          <Content {...props} />
        </LogListRepoProvider>
      </ModalLayoutGeneral.Content>
    </ModalLayoutGeneral>
  );
}
