import type { ReactNode } from 'react';
import { useState } from 'react';

import { Check, ChevronsUpDown } from 'lucide-react';

import useResizeObserver from '@/shared/libs/react-hooks/useResizeObserver';
import { cn } from '@/shared/libs/tailwind/cn';
import { Button } from '@/shared/presentation/atoms/Button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/shared/presentation/atoms/Command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shared/presentation/atoms/Popover';

export default function ComboboxWithSearch(props: ComboboxProps) {
  const { classNameButton, items, placeholder, value, onChange } = props;

  const [popoverWidth, setPopoverWidth] = useState(0);

  const refButton = useResizeObserver<HTMLButtonElement>((entries) => {
    setPopoverWidth(Math.floor(entries[0]?.borderBoxSize[0]?.inlineSize || 0));
  });

  const [open, setOpen] = useState(false);

  const cnButton = cn('w-[200px] justify-between', classNameButton);
  const cnButtonText = cn('line-clamp-1', {
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
        <Command>
          <CommandInput placeholder="Search" />
          <CommandList>
            <CommandEmpty>No data found.</CommandEmpty>
            <CommandGroup>
              {items?.map((item) => (
                <CommandItem
                  key={item.value}
                  value={item.value}
                  onSelect={(currentValue) => {
                    onChange?.(currentValue);
                    setOpen(false);
                  }}
                >
                  {item.label}
                  <Check
                    className={cn(
                      'ml-auto',
                      value === item.value ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

interface ComboboxProps {
  classNameButton?: string;
  items?: ComboboxItem[];
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
}

export interface ComboboxItem {
  value: string;
  label: ReactNode;
}
