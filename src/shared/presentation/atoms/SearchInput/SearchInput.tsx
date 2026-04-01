import { SearchIcon } from 'lucide-react';

import useStateOr from '@/shared/libs/react-hooks/useStateOr';
import { cn } from '@/shared/libs/tailwind/cn';

export default function SearchInput(props: SearchInputProps) {
  const {
    classNameWrapper,
    defaultValue,
    placeholder,
    value,
    maxLength,
    autoComplete,
    onChange,
    onEnter,
  } = props;

  const [internalValue, setInternalValue] = useStateOr(value);

  const cnWrapper = cn(
    'border rounded-md px-3 min-h-10 bg-white dark:bg-secondary flex items-center gap-2 focus-within:border-accent',
    classNameWrapper,
  );

  return (
    <label className={cnWrapper}>
      <input
        type="text"
        className="grow outline-hidden w-full"
        placeholder={placeholder ?? 'Search'}
        value={internalValue ?? defaultValue}
        maxLength={maxLength}
        autoComplete={autoComplete}
        onChange={(e) => {
          setInternalValue(e.target.value);
          onChange?.(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            onEnter?.(internalValue || '');
          }
        }}
      />
      <SearchIcon className="grow" width={16} height={16} />
    </label>
  );
}

interface SearchInputProps {
  classNameWrapper?: string;

  defaultValue?: string;
  value?: string;
  placeholder?: string;
  maxLength?: number;
  autoComplete?: string;
  onChange?: (newValue: string) => void;
  onEnter?: (value: string) => void;
}
