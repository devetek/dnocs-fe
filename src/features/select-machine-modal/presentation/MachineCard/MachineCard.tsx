import { Button } from '@/shared/presentation/atoms/Button';

export default function MachineCard(props: Props) {
  const { machineName, machinePublicIP, onClickSelect } = props;

  return (
    <Button
      className="h-auto cursor-pointer px-3 py-2 flex items-center justify-start text-start overflow-hidden"
      onClick={onClickSelect}
      variant="outline"
    >
      <div className="flex flex-col">
        <p className="text-md font-bold whitespace-break-spaces">
          {machineName}
        </p>
        <p className="text-sm">{machinePublicIP}</p>
      </div>
    </Button>
  );
}

interface Props {
  machineName: string;
  machinePublicIP: string;
  onClickSelect?: () => void;
}
