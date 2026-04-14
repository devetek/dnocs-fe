import type { ReactNode } from 'react';

import { cn } from '@/shared/libs/tailwind/cn';

interface ButtonSourceProps {
  className?: string;

  disabled?: boolean;
  checked?: boolean;
  icon: string | ((props: { className?: string }) => ReactNode);
  title: string;
  desc?: string;

  onClick?: () => void;
}

export default function ButtonSource(props: ButtonSourceProps) {
  const {
    className,
    checked,
    disabled,
    icon: Icon,
    title,
    desc,
    onClick,
  } = props;

  const cnRoot = cn(
    'w-full border-2 rounded-lg bg-card px-4 py-3 relative flex items-center gap-3 transition-all duration-150',
    {
      'border-accent shadow-xs': checked,
      'opacity-50 cursor-no-drop': disabled,
      'cursor-pointer': !disabled,
    },
    className,
  );

  const cnIcon = cn('size-6', {
    'text-accent': checked,
  });

  const elIcon =
    typeof Icon === 'string' ? (
      <img className={cnIcon} src={Icon} alt="Hero" />
    ) : (
      <Icon className={cnIcon} />
    );

  return (
    <button disabled={disabled} className={cnRoot} onClick={onClick}>
      <div className="flex justify-between shrink-0">{elIcon}</div>

      <div className="flex flex-col">
        <p className="text-start text-md font-bold">{title}</p>
        <p className="text-start text-sm">{desc}</p>
      </div>
    </button>
  );
}
