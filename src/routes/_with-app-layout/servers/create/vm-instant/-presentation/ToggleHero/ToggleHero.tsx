import type { ReactNode } from 'react';

import { cn } from '@/shared/libs/tailwind/cn';

export default function ToggleHero(props: Props) {
  const { className, checked, icon: Icon, title, desc, onClick } = props;

  const cnRoot = cn(
    'cursor-pointer border rounded-lg bg-card p-3 relative flex flex-col justify-end gap-2 transition-all duration-150',
    {
      'border-accent shadow-xs': checked,
    },
    className,
  );

  const cnToggleDeco = cn(
    'w-4 h-4 absolute top-3 right-3 border rounded-full transition-all duration-150',
    {
      'border-5 border-accent': checked,
    },
  );

  return (
    <button className={cnRoot} onClick={onClick}>
      <div className={cnToggleDeco} />

      <div className="flex justify-between">
        <Icon className="w-6 h-6" />
      </div>

      <div className="flex flex-col">
        <p className="text-start text-md font-bold">{title}</p>
        <p className="text-start text-sm">{desc}</p>
      </div>
    </button>
  );
}

interface Props {
  className?: string;

  checked?: boolean;
  icon: (props: { className?: string }) => ReactNode;
  title: string;
  desc?: string;

  onClick?: () => void;
}
