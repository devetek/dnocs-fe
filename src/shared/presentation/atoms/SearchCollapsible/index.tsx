import type { ChangeEvent, KeyboardEvent } from 'react';
import { useEffect, useRef, useState } from 'react';

import { SearchIcon, XIcon } from 'lucide-react';

import { cn } from '@/shared/libs/tailwind/cn';

import type { SearchCollapsibleProps } from './types';

export default function SearchCollapsible(props: SearchCollapsibleProps) {
  const { initialValue, placeholderText, onClickClear, onSubmit } = props;

  const [isExpanded, setIsExpanded] = useState(false);
  const [value, setValue] = useState(initialValue || '');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isExpanded) {
      inputRef.current?.focus();
    }
  }, [isExpanded]);

  const handleExpand = () => {
    setIsExpanded(true);
  };

  const handleClear = () => {
    setValue('');
    inputRef.current?.focus();
    onClickClear?.();
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSubmit?.(value, 'enter');
    }

    if (e.key === 'Escape' && !initialValue) {
      setValue('');
      inputRef.current?.blur();
      onClickClear?.();
    }
  };

  const handleInputFocusChange = (mode: 'focus' | 'blur') => {
    return () => {
      setIsExpanded(mode === 'focus');

      if (mode === 'blur') {
        onSubmit?.(value, 'blur');
      }
    };
  };

  const showInput = isExpanded || value.length > 0;

  const cnRoot = cn(
    'relative flex items-center transition-all duration-300 ease-in-out',
    showInput ? 'w-36 sm:w-64' : 'w-10',
  );

  const cnBtnSearch = cn(
    'absolute left-0 z-10 flex h-10 w-10 items-center justify-center rounded-lg text-gray-500 transition-colors',
    'hover:bg-gray-200 focus:outline-none dark:text-gray-400 dark:hover:bg-secondary/50',
    showInput ? 'pointer-events-none' : 'cursor-pointer',
  );

  const cnInput = cn(
    'h-10 w-full rounded-lg border border-gray-200 bg-white pl-10 pr-4 text-sm outline-none transition-all duration-300',
    'focus:border-blue-500 focus:ring-2 focus:ring-blue-200',
    'dark:border-secondary dark:bg-secondary/30 dark:text-gray-100 dark:focus:border-blue-400 dark:focus:ring-blue-900',
    showInput ? 'opacity-100' : 'w-0 opacity-0 p-0 border-none',
  );

  const cnInputClearBtn = cn(
    'absolute right-3 flex h-5 w-5 items-center justify-center rounded-lg text-gray-400',
    'hover:text-gray-600 dark:hover:text-gray-300',
  );

  return (
    <div className={cnRoot}>
      <button type="button" onClick={handleExpand} className={cnBtnSearch}>
        <SearchIcon size={20} />
      </button>

      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={handleInputChange}
        onFocus={handleInputFocusChange('focus')}
        onBlur={handleInputFocusChange('blur')}
        onKeyDown={handleKeyDown}
        className={cnInput}
        placeholder={placeholderText}
      />

      {value && (
        <button type="button" onClick={handleClear} className={cnInputClearBtn}>
          <XIcon size={14} />
        </button>
      )}
    </div>
  );
}
