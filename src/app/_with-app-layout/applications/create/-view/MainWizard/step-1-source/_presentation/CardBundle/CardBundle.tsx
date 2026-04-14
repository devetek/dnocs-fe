import { cn } from '@/shared/libs/tailwind/cn';

export default function CardBundle(props: Props) {
  const { className, checked, iconURL, title, desc, onClick } = props;

  const cnRoot = cn(
    'w-full cursor-pointer border-2 rounded-lg bg-card relative flex flex-col justify-end transition-all duration-150',
    {
      'border-accent shadow-xs': checked,
    },
    className,
  );

  const cnIcon = cn('size-8');

  return (
    <button className={cnRoot} onClick={onClick}>
      <div className="flex flex-col p-3 gap-2">
        <div className="flex justify-between">
          <img src={iconURL} alt="Bundle" className={cnIcon} />
        </div>

        <div className="flex flex-col">
          <p className="text-start text-md font-bold">{title}</p>
          <p className="text-start text-sm">{desc}</p>
        </div>
      </div>

      <div className="flex flex-col border-t p-3">
        <p className="text-start text-xs font-bold italic">Modules Required</p>
        <p className="text-start text-xs">PHP 8.4, MariaDB 10.11</p>
      </div>
    </button>
  );
}

interface Props {
  className?: string;

  checked?: boolean;
  iconURL: string;
  title: string;
  desc?: string;

  onClick?: () => void;
}
