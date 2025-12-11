export interface LogBrowserModalProps {
  appName: string;
  userName: string;
  machineID: number;

  onClickLogFile?: (logFilename: string) => void;
}
