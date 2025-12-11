import type { ReactNode } from 'react';

import { cn } from '@/shared/libs/tailwind/cn';
import { Tooltip } from '@/shared/presentation/atoms/Tooltip';

interface TemplateCardInfoProps {
  iconURL: string;
  title: string;
  desc: string;

  slotStatusIcon?: ReactNode;
  slotStatusTooltip?: string;

  onClickDesc?: () => void;
}

export default function TemplateCardInfo(props: TemplateCardInfoProps) {
  const {
    title,
    desc,
    iconURL,
    slotStatusIcon,
    slotStatusTooltip,
    onClickDesc,
  } = props;

  return (
    <div className="flex flex-col mb-2 relative h-full overflow-hidden">
      {slotStatusIcon && (
        <Tooltip className="absolute right-0 top-0" message={slotStatusTooltip}>
          {slotStatusIcon}
        </Tooltip>
      )}

      <img className="mb-2" src={iconURL} alt="Logo" width={48} height={48} />

      <p className="text-xl font-bold text-black dark:text-white break-all text-ellipsis">
        <Tooltip
          as="span"
          message={title}
          classNameTooltip="max-w-[200px] text-center"
        >
          {title.slice(0, 25)}
          {title.length > 25 ? '...' : ''}
        </Tooltip>
      </p>

      <p
        className={cn(
          `text-sm font-semibold text-black/40 dark:text-white/40 break-words`,
          {
            'cursor-pointer': Boolean(onClickDesc),
          },
        )}
        onClick={onClickDesc}
      >
        <Tooltip
          as="span"
          message={desc}
          classNameTooltip="max-w-[200px] text-center"
        >
          {desc.slice(0, 35)}
          {desc.length > 35 ? '...' : ''}
        </Tooltip>
      </p>
    </div>
  );
}
