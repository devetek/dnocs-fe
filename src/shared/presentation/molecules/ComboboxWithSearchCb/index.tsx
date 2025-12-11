import type { ReactNode } from 'react';
import { useState } from 'react';

import { Check, ChevronsUpDown } from 'lucide-react';

import useResizeObserver from '@/shared/libs/react-hooks/useResizeObserver';
import { cn } from '@/shared/libs/tailwind/cn';
import { Button } from '@/shared/presentation/atoms/Button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shared/presentation/atoms/Popover';

import { SearchInput } from '../../atoms/SearchInput';

export function ComboboxWithSearchCb<V>(props: ComboboxProps<V>) {
  const {
    classNameButton,
    items,
    placeholder,
    value,
    searchValue,
    onChange,
    onSearchEnter,
  } = props;

  const [popoverWidth, setPopoverWidth] = useState(0);

  const refButton = useResizeObserver<HTMLButtonElement>((entries) => {
    setPopoverWidth(Math.floor(entries[0]?.borderBoxSize[0]?.inlineSize || 0));
  });

  const [open, setOpen] = useState(false);

  const cnButton = cn(
    'w-[200px] justify-between dark:bg-secondary dark:hover:bg-accent',
    classNameButton,
  );
  const cnButtonText = cn({
    'opacity-50': !value,
  });

  const selectedItemLabel = items?.find(
    (framework) => framework.value === value,
  )?.label;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          ref={refButton}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cnButton}
        >
          <p className={cnButtonText}>
            {value ? selectedItemLabel : placeholder}
          </p>
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0" style={{ width: popoverWidth }}>
        <div className="p-1 w-full flex flex-col gap-1.5 max-h-80 overflow-y-auto">
          <SearchInput
            defaultValue={searchValue || ''}
            onEnter={onSearchEnter}
          />

          {items?.map((item) => {
            return (
              <Button
                className="min-h-8 h-max py-1"
                key={String(item.value)}
                variant="ghost"
                size="sm"
                onClick={() => {
                  onChange?.(item.value);
                  setOpen(false);
                }}
              >
                <p className="w-full text-start flex flex-col">
                  <span>{item.label}</span>

                  {item.description && <span>{item.description}</span>}
                </p>
                <Check
                  className={cn(
                    'ml-auto',
                    value === item.value ? 'opacity-100' : 'opacity-0',
                  )}
                />
              </Button>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}

interface ComboboxProps<V> {
  classNameButton?: string;
  items?: Array<ComboboxItem<V>>;
  placeholder?: string;
  value?: V;
  searchValue?: string;
  onChange?: (value: V) => void;
  onSearchEnter?: (searchQuery: string) => void;
}

export interface ComboboxItem<V> {
  value: V;
  label: ReactNode;
  description?: ReactNode;
}
