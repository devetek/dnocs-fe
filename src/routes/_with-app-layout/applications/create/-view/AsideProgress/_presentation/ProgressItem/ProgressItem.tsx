import { CheckIcon } from 'lucide-react';

import { cn } from '@/shared/libs/tailwind/cn';

import type { ProgressItemProps } from './types';

export default function ProgressItem(props: ProgressItemProps) {
  const { step, status = 'todo', stepName, stepDescription } = props;

  const cnStepCircle = cn(
    'w-8 h-8 shrink-0 rounded-full flex items-center justify-center',
    status === 'todo'
      ? 'bg-slate-100 dark:bg-slate-100/10'
      : 'bg-emerald-100 dark:bg-emerald-900',
  );

  const cnStepText = cn(
    '',
    status === 'todo'
      ? 'text-slate-400 dark:text-white/70'
      : 'text-emerald-600 dark:text-emerald-400',
  );

  return (
    <div className="flex items-center gap-2">
      <div className={cnStepCircle}>
        {status !== 'checked' ? (
          <p className={cnStepText}>{step}</p>
        ) : (
          <CheckIcon className="w-4 h-4 text-emerald-600" />
        )}
      </div>

      <div className="flex flex-col items-start gap-0.5">
        <p className="text-sm font-bold">{stepName}</p>
        <p className="text-xs">{stepDescription}</p>
      </div>
    </div>
  );
}
