import { ChevronRightIcon, ExternalLinkIcon } from 'lucide-react';

import { cn } from '@/shared/libs/tailwind/cn';
import { Button } from '@/shared/presentation/atoms/Button';

export interface AppCardProps {
  appName: string;
  appURL: string;
  appIconURL: string;
  machineName?: string;
  statusState: 'check' | 'pending' | 'progress' | 'error';
  statusMessage?: string;

  onClickAppURL?: () => void;
  onClickDetails?: () => void;
}

const STATUS_CONFIG: Record<
  AppCardProps['statusState'],
  { label: string; className: string }
> = {
  check: {
    label: 'Ready',
    className:
      'bg-green-500/10 text-green-600 dark:text-green-400 ring-green-500/20',
  },
  pending: {
    label: 'Pending',
    className: 'bg-gray-500/10 text-gray-500 ring-gray-500/20',
  },
  progress: {
    label: 'In Progress',
    className:
      'bg-amber-500/10 text-amber-600 dark:text-amber-400 ring-amber-500/20',
  },
  error: {
    label: 'Error',
    className: 'bg-red-500/10 text-red-600 dark:text-red-400 ring-red-500/20',
  },
};

export default function AppCard(props: AppCardProps) {
  const {
    appName,
    appURL,
    appIconURL,
    machineName,
    statusState,
    onClickAppURL,
    onClickDetails,
  } = props;

  const status = STATUS_CONFIG[statusState];

  return (
    <div className="flex items-center gap-3 px-4 py-3 hover:bg-muted/40 transition-colors group">
      <img
        src={appIconURL}
        alt={appName}
        className="w-9 h-9 rounded-xl shrink-0 object-contain"
      />

      <div className="flex-1 min-w-0">
        <p className="font-semibold text-sm text-primary truncate leading-tight">
          {appName}
        </p>
        <div className="flex items-center gap-1 mt-0.5">
          <button
            type="button"
            className="text-xs text-primary/50 hover:text-primary truncate transition-colors max-w-[220px] text-left"
            onClick={onClickAppURL}
          >
            {appURL}
          </button>
          {onClickAppURL && (
            <ExternalLinkIcon className="w-3 h-3 text-primary/30 shrink-0" />
          )}
        </div>
        {machineName && (
          <p className="text-xs text-primary/35 truncate mt-0.5 font-mono">
            {machineName}
          </p>
        )}
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <span
          className={cn(
            'text-xs font-medium px-2 py-0.5 rounded-full ring-1 ring-inset hidden sm:inline-block',
            status.className,
          )}
        >
          {status.label}
        </span>

        <Button
          size="icon"
          variant="ghost"
          className="w-7 h-7 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={onClickDetails}
        >
          <ChevronRightIcon className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}

