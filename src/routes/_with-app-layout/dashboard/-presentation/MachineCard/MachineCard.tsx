import { ChevronRightIcon, ServerIcon } from 'lucide-react';

import { Button } from '@/shared/presentation/atoms/Button';

interface MachineCardProps {
  serverName: string;
  serverHostAddress: string;
  onClickDetails?: () => void;
}

export default function MachineCard(props: MachineCardProps) {
  const { serverName, serverHostAddress, onClickDetails } = props;

  return (
    <div className="flex items-center gap-3 px-4 py-3 hover:bg-muted/40 transition-colors group">
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

      <Button
        size="icon"
        variant="ghost"
        className="w-7 h-7 opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
        onClick={onClickDetails}
      >
        <ChevronRightIcon className="w-4 h-4" />
      </Button>
    </div>
  );
}
