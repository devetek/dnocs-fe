import type { MouseEventHandler } from 'react';
import { useRef } from 'react';

import { getDistanceFromNow } from '@/shared/libs/browser/date';
import { cn } from '@/shared/libs/tailwind/cn';

import type { BaseButtonProps, GridItemProps, RowItemProps } from './types';

export const CN_CONTENT_ITEM_BASE = cn(
  'text-primary',
  'data-[selected=true]:bg-primary! data-[selected=true]:text-white! dark:data-[selected=true]:text-black! transition-all',
  'hover:bg-primary! hover:text-white dark:hover:text-black select-none',
);

export const RowHeader = () => (
  <div className="border-b px-4 py-2 grid gap-x-1 grid-cols-[2.5fr_0.5fr_1fr_1fr]">
    <p className="flex items-center text-sm font-semibold text-primary pl-6">
      Name
    </p>
    <p className="flex items-center text-sm font-semibold text-primary">Size</p>
    <p className="flex items-center text-sm font-semibold text-primary">Kind</p>
    <p className="flex items-center text-sm font-semibold text-primary">
      Last Modified
    </p>
  </div>
);

const BaseButton = (props: BaseButtonProps) => {
  const { children, onClick, onDoubleClick, ...rest } = props;

  const refLastTap = useRef(0);
  const refTapTimeout = useRef<number | null>(null);

  const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    console.log('x');

    e.preventDefault();
    e.stopPropagation();

    const now = Date.now();
    const diff = now - refLastTap.current;

    if (diff < 250) {
      if (refTapTimeout.current) {
        clearTimeout(refTapTimeout.current);
      }

      onDoubleClick?.(e);
    } else {
      refTapTimeout.current = window.setTimeout(() => {
        onClick?.(e);
      }, 250);
    }

    refLastTap.current = now;
  };

  return (
    <button
      {...rest}
      onClick={handleClick}
      onDoubleClick={(e) => e.preventDefault()}
    >
      {children}
    </button>
  );
};

export const RowItem = (props: RowItemProps) => {
  const {
    icon: Icon,
    isOdd,
    isSelected,
    contentName,
    contentFileSizeFormatted,
    contentLastUpdated,
    contentFileExtension,
    onClick,
    onDoubleClick,
  } = props;

  const cnContentItemTable = cn(
    CN_CONTENT_ITEM_BASE,
    'text-primary text-left break-all w-full px-2 py-1 rounded transition-all data-[odd=true]:bg-background group',
    'w-full grid gap-x-2 grid-cols-[2.5fr_0.5fr_1fr_1fr] [&>p]:flex [&>p]:items-center',
  );

  return (
    <BaseButton
      className={cnContentItemTable}
      data-odd={isOdd}
      data-selected={isSelected}
      onClick={onClick}
      onDoubleClick={onDoubleClick}
    >
      <p className="flex items-center gap-2">
        <Icon className="size-4 shrink-0" />
        {contentName}
      </p>

      <p className="text-sm" data-selected={isSelected}>
        {contentFileSizeFormatted}
      </p>
      <p className="text-sm" data-selected={isSelected}>
        {contentFileExtension}
      </p>
      <p className="text-sm" data-selected={isSelected}>
        {getDistanceFromNow(contentLastUpdated)}
      </p>
    </BaseButton>
  );
};

export const GridItem = (props: GridItemProps) => {
  const { contentName, icon: Icon, isSelected, onClick, onDoubleClick } = props;

  const cnContentItemTile = cn(
    CN_CONTENT_ITEM_BASE,
    'min-h-10 flex flex-col items-center gap-y-1 px-2 py-4 rounded break-all',
  );

  return (
    <BaseButton
      className={cnContentItemTile}
      data-selected={isSelected}
      onClick={onClick}
      onDoubleClick={onDoubleClick}
    >
      <Icon className="size-6 shrink-0" />
      {contentName}
    </BaseButton>
  );
};
