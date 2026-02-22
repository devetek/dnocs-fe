import { cn } from '@/shared/libs/tailwind/cn';

import { Tooltip } from '../Tooltip';

import type { SegmentedControlProps } from './types';

export default function SegmentedControl<Id extends string>(
  props: SegmentedControlProps<Id>,
) {
  const { activeItemId, options, onClickOption } = props;

  const handleClickOption = (id: Id) => {
    return () => {
      onClickOption?.(id);
    };
  };

  if (options.length < 1) return null;

  const cnWrapper = cn(
    'bg-background rounded-md p-0.5 dark:p-0.75 flex inset-shadow-sm border',
  );

  return (
    <div className={cnWrapper}>
      {options.map((option) => {
        const { id, icon: Icon, text, tooltipText } = option;

        const cnButton = cn('rounded-sm cursor-pointer px-2.5 py-2', {
          'bg-card shadow-xs hover:shadow-md not-dark:border':
            activeItemId === id,
          'hover:bg-black/[0.025] dark:hover:bg-white/[0.025]':
            activeItemId !== id,
        });

        const cnText = cn(
          'text-sm flex items-center gap-x-1.5',
          activeItemId === id ? 'text-foreground' : 'text-foreground/50',
        );

        return (
          <Tooltip
            as="button"
            key={id}
            className={cnButton}
            message={tooltipText}
            asProps={{
              onClick: handleClickOption(id),
            }}
          >
            <p className={cnText}>
              {Icon && <Icon className="size-4" />}
              {text}
            </p>
          </Tooltip>
        );
      })}
    </div>
  );
}
