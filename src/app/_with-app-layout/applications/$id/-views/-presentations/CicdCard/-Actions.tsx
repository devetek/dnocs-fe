import '@/shared/libs/browser/array';
import { useRef, useState } from 'react';

import { cn } from '@/shared/libs/tailwind/cn';
import { Button } from '@/shared/presentation/atoms/ButtonV2';
import { Dropdown } from '@/shared/presentation/atoms/Dropdown';
import IconThreeDots from '@/shared/presentation/icons/ThreeDots';

import type { ActionsProps } from './-types';

export default function Actions(props: ActionsProps) {
  const { actions } = props;

  const [isMoreDropdownOpen, setIsMoreDropdownOpen] = useState(false);

  const refButtonMore = useRef<HTMLButtonElement>(null);

  const handleClickMore = () => {
    setIsMoreDropdownOpen(true);
  };

  const handleClickOutsideMoreDropdown = () => {
    setIsMoreDropdownOpen(false);
  };

  const [topActions, moreActions] = actions.splitAt(actions.length > 3 ? 2 : 3);

  return (
    <div className="flex flex-col gap-y-2 md:ml-auto md:w-25">
      {topActions.map((action) => {
        const {
          id,
          label,
          icon: Icon,
          color = 'neutral',
          isPrimary,
          onClick,
        } = action;

        return (
          <Button
            key={id}
            size="sm"
            danger={color === 'danger'}
            buttonColor={isPrimary ? 'primary' : 'secondary'}
            buttonStyle={isPrimary ? 'flat' : 'outline'}
            onClick={onClick}
          >
            <Icon /> {label}
          </Button>
        );
      })}
      {moreActions.length > 0 && (
        <>
          <Button
            ref={refButtonMore}
            size="sm"
            buttonColor="secondary"
            buttonStyle="outline"
            onClick={handleClickMore}
          >
            <IconThreeDots /> More
          </Button>
          <Dropdown
            refTarget={refButtonMore}
            isOpen={isMoreDropdownOpen}
            gapInPx={4}
            alignment="right"
            onClickOutside={handleClickOutsideMoreDropdown}
          >
            <div className="py-1 flex flex-col">
              {moreActions.map((action) => {
                const {
                  id,
                  label,
                  icon: Icon,
                  color = 'neutral',
                  isPrimary,
                  onClick,
                } = action;

                const cnButton = cn(
                  'px-4 py-2 transition-all',
                  'flex items-center justify-center gap-x-2',
                  'text-sm',
                  {
                    'text-red-500 hover:bg-red-500/10': color === 'danger',
                    'hover:bg-accent/20 hover:text-accent':
                      color === 'neutral' && !isPrimary,
                    'hover:bg-primary hover:text-white': isPrimary,
                  },
                );

                const handleClick = () => {
                  setIsMoreDropdownOpen(false);
                  onClick?.();
                };

                return (
                  <button
                    key={id}
                    type="button"
                    className={cnButton}
                    onClick={handleClick}
                  >
                    <Icon className="size-4" /> {label}
                  </button>
                );
              })}
            </div>
          </Dropdown>
        </>
      )}
    </div>
  );
}
