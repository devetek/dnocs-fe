import { useRef, useState } from 'react';

import { iife } from '@/shared/libs/browser/iife';
import { excludeFalsy } from '@/shared/libs/browser/typeguards';
import useClickOutside from '@/shared/libs/react-hooks/useClickOutside';
import { cn } from '@/shared/libs/tailwind/cn';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shared/presentation/atoms/Popover';
import { Tooltip } from '@/shared/presentation/atoms/Tooltip';
import IconThreeDots from '@/shared/presentation/icons/ThreeDots';

import type {
  ActionButtonProps,
  MenuItemProps,
} from '../../rules/types/shared';
import type { ResourceCardFullActionsProps as ActionProps } from '../../rules/types/variant-full';

const ActionButton = (props: ActionButtonProps) => {
  const { ref, action, isPrimary, visibleActionOnlyIcon } = props;

  const {
    className,
    label,
    disabled,
    icon: Icon,
    iconActive: IconActive,
    onClick,
    variant = 'normal',
  } = action;

  const cnActionWrapper = cn(
    'text-sm px-3 py-2 w-full transition-all flex items-center justify-center gap-2 group',
    !isPrimary && 'border-t',
    disabled && 'opacity-50 cursor-no-drop',
    !disabled && {
      'hover:bg-accent/20 hover:text-accent': variant === 'normal',
      'text-red-500 hover:bg-red-500/10 ': variant === 'destructive',
    },
    className,
  );

  const elIcon = iife(() => {
    if (!Icon) return null;

    return (
      <>
        <Icon
          className="size-4 data-[has-active=true]:group-hover:hidden"
          data-has-active={!!IconActive && !disabled}
        />
        {!!IconActive && !disabled && (
          <IconActive className="size-4 hidden group-hover:block" />
        )}
      </>
    );
  });

  if (visibleActionOnlyIcon && elIcon) {
    return (
      <Tooltip as="div" message={label} passthrough>
        <button
          ref={ref}
          disabled={disabled}
          className={cnActionWrapper}
          onClick={onClick}
        >
          {elIcon}
        </button>
      </Tooltip>
    );
  }

  return (
    <button
      ref={ref}
      disabled={disabled}
      className={cnActionWrapper}
      onClick={onClick}
    >
      {elIcon}
      {label}
    </button>
  );
};

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
      'text-red-500 hover:bg-red-500/10': variant === 'destructive',
    },
  );

  const elIcon = iife(() => {
    if (!Icon) return null;

    return (
      <>
        <Icon
          className="size-4 data-[has-active=true]:group-hover:hidden"
          data-has-active={!!IconActive && !disabled}
        />
        {!!IconActive && !disabled && (
          <IconActive className="size-4 hidden group-hover:block" />
        )}
      </>
    );
  });

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

export default function RCDActions(props: ActionProps) {
  const { className, actions = [], visibleActionOnlyIcon, labelMore } = props;

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const refPopover = useRef<HTMLDivElement>(null);

  useClickOutside(refPopover, () => {
    setIsPopoverOpen(false);
  });

  const handleClickActSecondary = () => {
    setIsPopoverOpen(true);
  };

  const [primaryAction, ...secondaryActions] = actions.filter(excludeFalsy);

  if (primaryAction == null) return null;

  const cnWrapper = cn(
    'border-l flex flex-col justify-center min-w-16 h-full',
    className,
  );

  const cnPopover = cn('w-max p-0 flex flex-col py-1');

  const elSecondaryActions = iife(() => {
    if (secondaryActions.length < 1) return null;

    if (secondaryActions.length < 2 && secondaryActions[0]) {
      return (
        <ActionButton
          action={secondaryActions[0]}
          visibleActionOnlyIcon={visibleActionOnlyIcon}
        />
      );
    }

    return (
      <Popover open={isPopoverOpen}>
        <PopoverTrigger asChild>
          <ActionButton
            action={{
              label: labelMore || 'More',
              icon: IconThreeDots,
              onClick: handleClickActSecondary,
            }}
            visibleActionOnlyIcon={visibleActionOnlyIcon}
          />
        </PopoverTrigger>
        <PopoverContent ref={refPopover} className={cnPopover}>
          {secondaryActions.map((secondaryAct, index) => {
            return (
              <MenuItem
                action={secondaryAct}
                onClickItem={() => {
                  setIsPopoverOpen(false);
                }}
                key={index}
              />
            );
          })}
        </PopoverContent>
      </Popover>
    );
  });

  return (
    <div className={cnWrapper}>
      <ActionButton
        action={primaryAction}
        isPrimary
        visibleActionOnlyIcon={visibleActionOnlyIcon}
      />

      {elSecondaryActions}
    </div>
  );
}
