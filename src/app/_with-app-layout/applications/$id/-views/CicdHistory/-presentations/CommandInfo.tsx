import { VariableIcon } from 'lucide-react';

import { Tooltip } from '@/shared/presentation/atoms/Tooltip';

interface Props {
  command: string;
  envCount: number;
  className?: string;
}

export default function CommandInfo(props: Props) {
  const { command, envCount, className } = props;

  return (
    <div className={className}>
      <p className="uppercase text-2xs font-semibold text-muted-foreground tracking-wider">
        Command
      </p>

      <div className="p-0.5 pl-2 mt-0.5 border rounded-sm rounded-r-2xl bg-background grid grid-cols-[1fr_auto] items-center">
        <span className="font-roboto-mono font-medium text-xs overflow-hidden flex items-center gap-x-1">
          <span className="text-green-700 dark:text-green-500">$</span>
          <span className="text-primary dark:text-white truncate">
            {command}
          </span>
        </span>

        <Tooltip
          className="rounded-full border bg-card py-0.5 pl-1.5 pr-1 flex items-center gap-x-0.5 text-xs font-semibold"
          message="# of Environment Variables"
        >
          {envCount} <VariableIcon className="size-4" />
        </Tooltip>
      </div>
    </div>
  );
}
