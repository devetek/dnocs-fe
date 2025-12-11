export interface DbCreateModalProps {
  onSubmitSuccess?: () => void;
}

export interface SelectedEngine {
  engineName: string;
  engineIcon: string;
  engineValue: string;
}

export interface SelectedMachine {
  machineID: number;
  machineName: string;
}
