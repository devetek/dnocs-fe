import { RocketIcon } from 'lucide-react';

import { Spinner } from '@/shared/presentation/atoms/Spinner';

import type { PlaceholderStateProps } from './types';

export function PlaceholderState(props: PlaceholderStateProps) {
  const { variant } = props;

  switch (variant) {
    case 'initial':
      return (
        <div className="w-full h-full flex flex-col items-center justify-center">
          <RocketIcon className="size-20 text-primary opacity-30" />

          <p className="mt-4 text-primary/70">
            Please select a directory first.
          </p>
        </div>
      );

    case 'loading':
      return (
        <div className="flex items-center justify-center">
          <Spinner />
        </div>
      );
  }
}
