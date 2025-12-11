import type { ChangeEvent } from 'react';
import { useState } from 'react';

import { cn } from '@/shared/libs/tailwind/cn';

import { Input } from '../../atoms/Input';

import type { InputWithValidationProps } from './types';

export default function InputWithValidation(props: InputWithValidationProps) {
  const {
    className,
    classNameInput,
    placeholder,
    validations,
    onChange,
    onAcceptedChange,
  } = props;

  const [internalState, setInternalState] = useState({
    value: '',
    errorMessages: [] as string[],
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    const errorMessages: string[] = [];

    for (const validation of validations ?? []) {
      if (!newValue) break;

      switch (true) {
        case validation instanceof RegExp: {
          const legal = validation.test(newValue);
          if (!legal) {
            errorMessages.push(`Must be ${validation.source}`);
          }

          break;
        }

        case typeof validation === 'function': {
          const validationMessage = validation(newValue);

          if (validationMessage !== true) {
            errorMessages.push(validationMessage);
          }

          break;
        }
      }
    }

    onChange?.(newValue, errorMessages.join(', '));
    onAcceptedChange?.(!errorMessages.length ? newValue : '');

    setInternalState({
      value: newValue,
      errorMessages,
    });
  };

  const cnRoot = cn(`flex flex-col w-full gap-1`, className);
  const cnInput = cn(
    {
      'border-red-500': internalState.errorMessages.length > 0,
    },
    classNameInput,
  );

  return (
    <div className={cnRoot}>
      <Input
        className={cnInput}
        placeholder={placeholder}
        value={internalState.value}
        onChange={handleChange}
      />
      {internalState.errorMessages.length > 0 && (
        <p className="italic text-xs text-red-500">
          {internalState.errorMessages.join(', ')}
        </p>
      )}
    </div>
  );
}
