import type { ReactNode } from 'react';

import type { LucideIcon } from 'lucide-react';

interface SpecItemProps {
  icon: LucideIcon;
  label: string;
  value?: ReactNode;
  children?: ReactNode;
  className?: string;
}

function SpecItem(props: SpecItemProps) {
  const { icon: Icon, label, value, children, className } = props;

  return (
    <div className={`flex flex-col ${className}`}>
      <p className="uppercase text-2xs font-semibold text-muted-foreground tracking-wider flex items-center gap-x-0.5">
        <Icon className="size-2.5" /> {label}
      </p>
      <div className="mt-0.5 flex items-center gap-x-1">
        {value && (
          <span className="text-sm font-roboto-mono tracking-tight leading-4.5">
            {value}
          </span>
        )}
        {children}
      </div>
    </div>
  );
}

interface Props {
  children: ReactNode;
}

export default function TechnicalSpecs(props: Props) {
  const { children } = props;

  return (
    <div className="shrink-0 size-full pt-2 pb-3">
      <div className="size-full border-l px-3 flex flex-col">{children}</div>
    </div>
  );
}

TechnicalSpecs.Item = SpecItem;
