import { ChevronRightIcon, ServerIcon } from 'lucide-react';

interface MachineCardProps {
  serverName: string;
  serverHostAddress: string;
  onClickDetails?: () => void;
}

export default function MachineCard(props: MachineCardProps) {
  const { serverName, serverHostAddress, onClickDetails } = props;

  return (
    <button
      type="button"
      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-muted/40 transition-colors text-left"
      onClick={onClickDetails}
    >
      <div className="w-9 h-9 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0">
        <ServerIcon className="w-4 h-4 text-blue-500" />
      </div>

      <div className="flex-1 min-w-0">
        <p className="font-semibold text-sm text-primary truncate leading-tight">
          {serverName}
        </p>
        <p className="text-xs text-primary/50 font-mono truncate mt-0.5">
          {serverHostAddress}
        </p>
      </div>

      <ChevronRightIcon className="w-4 h-4 text-primary/40 shrink-0" />
    </button>
  );
}
