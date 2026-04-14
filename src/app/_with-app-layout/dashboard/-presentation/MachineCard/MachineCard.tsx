import { ChevronRightIcon, ServerIcon } from 'lucide-react';

import { cn } from '@/shared/libs/tailwind/cn';

type StatusState = 'ready' | 'progress' | 'failed' | 'other';

interface MachineCardProps {
  serverName: string;
  serverHostAddress: string;
  statusState?: StatusState;
  onClickDetails?: () => void;
}

const STATUS_CONFIG: Record<StatusState, { label: string; className: string }> =
  {
    ready: {
      label: 'Ready',
      className:
        'bg-green-500/10 text-green-600 dark:text-green-400 ring-green-500/20',
    },
    progress: {
      label: 'In Progress',
      className:
        'bg-amber-500/10 text-amber-600 dark:text-amber-400 ring-amber-500/20',
    },
    failed: {
      label: 'Failed',
      className: 'bg-red-500/10 text-red-600 dark:text-red-400 ring-red-500/20',
    },
    other: {
      label: 'Unknown',
      className: 'bg-gray-500/10 text-gray-500 ring-gray-500/20',
    },
  };

export default function MachineCard(props: MachineCardProps) {
  const { serverName, serverHostAddress, statusState, onClickDetails } = props;

  const status = statusState ? STATUS_CONFIG[statusState] : null;

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

      <div className="flex items-center gap-2 shrink-0">
        {status && (
          <span
            className={cn(
              'text-xs font-medium px-2 py-0.5 rounded-full ring-1 ring-inset hidden sm:inline-block',
              status.className,
            )}
          >
            {status.label}
          </span>
        )}

        <ChevronRightIcon className="w-4 h-4 text-primary/40 shrink-0" />
      </div>
    </button>
  );
}
