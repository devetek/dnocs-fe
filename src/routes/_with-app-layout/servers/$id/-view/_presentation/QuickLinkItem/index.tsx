import type { LucideIcon } from 'lucide-react';

import { cn } from '@/shared/libs/tailwind/cn';

export default function QuickLinkItem(props: Props) {
  const { label, logoUrl, icon: Icon, onClick, isDisabled } = props;

  return (
    <button
      disabled={isDisabled}
      className={cn(
        'cursor-pointer w-full h-full flex flex-col items-center justify-center gap-2 rounded-xl border border-border/50 bg-card',
        'px-3 py-4 min-h-24 text-center transition-all',
        'hover:bg-accent/50 hover:border-primary/30 hover:shadow-sm',
        'active:scale-95',
        'disabled:opacity-60 disabled:cursor-default disabled:hover:bg-card disabled:hover:border-border/50 disabled:active:scale-100',
      )}
      onClick={onClick}
    >
      <div className="flex items-center justify-center size-10 rounded-lg bg-primary/10 text-primary shrink-0">
        {Icon ? (
          <Icon className="size-5" />
        ) : (
          <img className="size-5 object-contain" src={logoUrl} alt={label} />
        )}
      </div>

      <p className="text-xs font-medium text-foreground/80 leading-tight">{label}</p>
    </button>
  );
}

interface Props {
  label: string;
  logoUrl?: string;
  icon?: LucideIcon;
  isDisabled?: boolean;
  onClick?: () => void;
}
