import { useState } from 'react';

import { EyeClosedIcon, EyeIcon as EyeOpenIcon } from 'lucide-react';

import { Button } from '@/shared/presentation/atoms/Button';

import type { ROItemProps, ReadOnlyViewProps } from './types';

const ROItem = (props: ROItemProps) => {
  const { label, value, isHidden } = props;

  const [isVisible, setIsVisible] = useState(!isHidden);

  const EyeIcon = !isVisible ? EyeClosedIcon : EyeOpenIcon;

  return (
    <section className="flex flex-col">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium">{label}</p>

        <Button
          variant="ghost"
          size="xs"
          onClick={() => setIsVisible(!isVisible)}
        >
          <EyeIcon className="h-4 w-4" />
        </Button>
      </div>
      <pre className="border bg-background px-3 py-2 rounded-lg break-all text-sm whitespace-break-spaces">
        {isVisible ? (
          value
        ) : (
          <em className="opacity-30">This content is hidden.</em>
        )}
      </pre>
    </section>
  );
};

export default function ReadOnlyView(props: ReadOnlyViewProps) {
  const { data } = props;

  return (
    <div className=" flex flex-col gap-6 mb-4">
      {Object.entries(data).map((item) => {
        const [key, value] = item;

        return (
          <ROItem
            key={key}
            label={key}
            value={String(value)}
            isHidden={/(private)|(secret)|(token)/.test(key)}
          />
        );
      })}
    </div>
  );
}
