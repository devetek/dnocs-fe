import type { ReactNode } from 'react';

import { cn } from '@/shared/libs/tailwind/cn';

interface Props {
  className?: string;
  icon: (props: { className?: string }) => ReactNode;
  active?: boolean;
  title: string;
  subtitle?: string;
  desc?: string;

  onClick?: () => void;
}

export default function ButtonHero(props: Props) {
  const {
    className,
    active,
    icon: Icon,
    title,
    subtitle,
    desc,
    onClick,
  } = props;

  const cnRoot = cn(
    'cursor-pointer h-full border rounded-2xl bg-card p-6 relative flex flex-col justify-start items-center gap-2 transition-all duration-150',
    'group hover:shadow-xl hover:shadow-blue-500/10 hover:border-blue-500',
    {
      'shadow-xl shadow-blue-500/10 border-blue-500': active,
    },
    className,
  );

  const cnIcon = cn(
    'w-8 sm:w-12 h-8 sm:h-12',
    'transition-all duration-150 group-hover:text-blue-500',
    {
      'text-blue-500': active,
    },
  );

  return (
    <button className={cnRoot} onClick={onClick}>
      <div className="flex justify-between">
        <Icon className={cnIcon} />
      </div>

      <div className="mt-3 flex flex-col">
        <p className="text-center text-xl font-bold">{title}</p>
        <p className="text-center text-xs sm:text-sm italic">{subtitle}</p>
        <p className="mt-2 text-center text-sm sm:text-md">{desc}</p>
      </div>
    </button>
  );
}
