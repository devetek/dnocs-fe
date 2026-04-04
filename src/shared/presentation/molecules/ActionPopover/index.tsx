import { useRef, useState } from 'react';

import useClickOutside from '@/shared/libs/react-hooks/useClickOutside';
import { cn } from '@/shared/libs/tailwind/cn';

import { Popover, PopoverContent, PopoverTrigger } from '../../atoms/Popover';

import type { MenuItemProps, ActionPopoverProps as Props } from './types';

const MenuItem = (props: MenuItemProps) => {
  const { action, onClickItem } = props;

  const {
    className,
    label,
    disabled,
    variant = 'normal',
    onClick,
    icon: Icon,
    iconActive: IconActive,
  } = action;

  const handleClick = () => {
    onClick?.();
    onClickItem();
  };

  const cnActWrapper = cn(
    'px-4 py-2 text-sm flex items-center justify-center gap-1 transition-all',
    disabled && 'opacity-50 cursor-no-drop',
    !disabled && {
      'hover:bg-accent/20 hover:text-accent': variant === 'normal',
      'text-red-500 hover:bg-red-500/10': variant === 'danger',
    },
  );

  const elIcon = Icon ? (
    <>
      <Icon
        className="size-4 data-[has-active=true]:group-hover:hidden"
        data-has-active={!!IconActive && !disabled}
      />
      {!!IconActive && !disabled && (
        <IconActive className="size-4 hidden group-hover:block" />
      )}
    </>
  ) : null;

  return (
    <button
      disabled={disabled}
      className={cn(cnActWrapper, className)}
      onClick={handleClick}
    >
      {elIcon}
      {label}
    </button>
  );
};

export default function ActionPopover(props: Props) {
  const { actions, children } = props;

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const refPopover = useRef<HTMLDivElement>(null);
  const refPopoverTrigger = useRef<HTMLButtonElement>(null);

  useClickOutside<HTMLElement>([refPopover, refPopoverTrigger], () => {
    setIsPopoverOpen(false);
  });

  const handleClickChild = () => {
    setIsPopoverOpen((v) => !v);
  };

  const cnPopover = cn('w-max p-0 flex flex-col py-1');

  return (
    <Popover open={isPopoverOpen}>
      <PopoverTrigger
        asChild
        ref={refPopoverTrigger}
        onClick={handleClickChild}
      >
        {children}
      </PopoverTrigger>
      <PopoverContent ref={refPopover} className={cnPopover}>
        {actions.map((secondaryAct, index) => {
          return (
            <MenuItem
              key={index}
              action={secondaryAct}
              onClickItem={() => {
                setIsPopoverOpen(false);
              }}
            />
          );
        })}
      </PopoverContent>
    </Popover>
  );
}
