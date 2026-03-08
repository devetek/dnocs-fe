import type { ComponentProps } from 'react';

import { cn } from '@/shared/libs/tailwind/cn';

export interface InputProps extends ComponentProps<'input'> {
  variant?: 'flat' | '3d';
}

export function Input(props: InputProps) {
  const { className, variant = 'flat', ref, type: inputType, ...rest } = props;

  const cnInput = cn(
    'flex h-10 w-full rounded-md px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
    'file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground',
    'focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    {
      'border border-input bg-white dark:bg-secondary': variant === 'flat',
      'inset-shadow-sm border bg-card rounded-xl': variant === '3d',
    },
    className,
  );

  return <input {...rest} type={inputType} ref={ref} className={cnInput} />;
}
