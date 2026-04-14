import { CheckIcon } from 'lucide-react';

import { cn } from '@/shared/libs/tailwind/cn';

import type { SelectionListProps as Props } from './types';

export default function SelectionList<Id extends string | number>(
  props: Props<Id>,
) {
  const { items, selectedId, onClickItem } = props;

  return (
    <div className="rounded-lg border overflow-hidden overflow-y-auto flex flex-col max-h-[300px]">
      {items.map((item, index) => {
        const { id, title, desc } = item;

        const cnCard = cn(
          'cursor-pointer px-3 py-2 flex items-center justify-between transition-all',
          'data-[active=true]:bg-emerald-50 dark:data-[active=true]:bg-emerald-950',
          'hover:bg-primary/5',
          {
            'border-b': index !== items.length - 1,
          },
        );

        return (
          <div
            tabIndex={0}
            role="button"
            key={index}
            className={cnCard}
            onClick={() => onClickItem?.(id)}
            data-active={selectedId === id}
          >
            <div className="flex flex-col">
              <p className="text-sm font-bold">{title}</p>
              {desc && <p className="text-xs">{desc}</p>}
            </div>

            <div className="flex items-center justify-center">
              {selectedId === id && (
                <CheckIcon className="w-4 h-4 text-green-500" />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
