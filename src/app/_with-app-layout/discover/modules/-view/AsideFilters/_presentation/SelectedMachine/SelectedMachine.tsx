import { Button } from '@/shared/presentation/atoms/Button';

export default function SelectedMachine(props: Props) {
  const { machineName, machinePublicAddress, onClickChange } = props;

  return (
    <div className="border bg-background rounded-lg">
      <p className="text-xs px-2 py-0.5 font-bold text-primary">
        Selected Machine
      </p>
      <div className="bg-card border-t rounded-lg p-2 flex items-center justify-between gap-2">
        <div className="flex flex-col">
          <p className="text-md font-bold text-primary line-clamp-1 overflow-ellipsis break-all">
            {machineName}
          </p>

          <p className="text-xs text-primary line-clamp-1">
            IP: {machinePublicAddress}
          </p>
        </div>

        <div>
          <Button size="sm" variant="outline" onClick={onClickChange}>
            Change...
          </Button>
        </div>
      </div>
    </div>
  );
}

interface Props {
  machineName: string;
  machinePublicAddress: string;
  machineID: number;

  onClickChange?: () => void;
}
