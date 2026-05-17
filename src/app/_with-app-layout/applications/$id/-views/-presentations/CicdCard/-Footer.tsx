import { cn } from '@/shared/libs/tailwind/cn';

import type { FooterProps } from './-types';

export default function Footer(props: FooterProps) {
  const { className, attributes } = props;

  const cnWrapper = cn(
    'p-3 pt-2 flex items-center flex-wrap gap-x-4 gap-y-1 mt-2',
    className,
  );

  return (
    <div className={cnWrapper}>
      {attributes.map((attribute) => {
        const { id, icon: Icon, label } = attribute;

        return (
          <p
            key={id}
            className="text-xs text-primary/70 flex items-center gap-0.5"
          >
            <Icon className="size-3" />
            {label}
          </p>
        );
      })}
    </div>
  );
}
