import { useRef, useState } from 'react';

import { CheckIcon, ChevronDownIcon } from 'lucide-react';

import useClickOutside from '@/shared/libs/react-hooks/useClickOutside';
import { cn } from '@/shared/libs/tailwind/cn';

import { Card } from '../../atoms/Card';
import { Popover, PopoverContent, PopoverTrigger } from '../../atoms/Popover';

import type { HeaderItemDropdownProps, PageHeaderProps } from './types';

const HeaderItemDropdown = (props: HeaderItemDropdownProps) => {
  const {
    classNameWrapper,
    classNameText,
    dropdownItems,
    icon: Icon,
    text,
  } = props;

  const refDropdown = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);

  const toggleIsOpen = () => {
    setIsOpen((value) => !value);
  };

  useClickOutside(refDropdown, toggleIsOpen);

  return (
    <Popover open={isOpen}>
      <PopoverTrigger asChild>
        <div className={classNameWrapper} onClick={toggleIsOpen}>
          <Icon className="w-4 h-4" />
          <p className={classNameText}>{text}</p>
          <ChevronDownIcon className="w-4 h-4" />
        </div>
      </PopoverTrigger>
      <PopoverContent
        className="w-max px-0 py-1 flex flex-col"
        ref={refDropdown}
      >
        {dropdownItems.map((item, index) => {
          const { label, isActive, onClick } = item;

          const handleClick = () => {
            if (!onClick || isActive) return;

            toggleIsOpen();
            onClick();
          };

          return (
            <button
              key={index}
              className="px-3 py-2 text-left hover:bg-accent/20! focus:outline-0 focus:bg-primary/10 flex items-center justify-between gap-4"
              onClick={handleClick}
            >
              {label}

              {isActive ? (
                <CheckIcon className="size-4" />
              ) : (
                <div className="size-4" />
              )}
            </button>
          );
        })}
      </PopoverContent>
    </Popover>
  );
};

export default function PageHeader(props: PageHeaderProps) {
  const {
    classNameStatusIconItem,
    title,
    description,
    statuses,
    heroIcon: HeroIcon,
    footnote,
    footnoteAs: FootnoteAs = 'p',
    headnote,
    headnoteAs: HeadnoteAs = 'p',
    rightAppend,
  } = props;

  return (
    <Card className="rounded-xl sm:rounded-2xl shadow-xs mb-8 bg-card/40">
      {headnote && (
        <div className="px-3 sm:px-4 py-1">
          <HeadnoteAs className="text-primary text-xs sm:text-sm">
            {headnote}
          </HeadnoteAs>
        </div>
      )}

      <Card className="rounded-xl sm:rounded-2xl border-none shadow-sm bg-card py-3 px-3 sm:py-6 sm:px-5 flex justify-between items-center gap-1">
        <div className="flex flex-col">
          <h1 className="text-primary text-xl sm:text-3xl font-bold flex items-center">
            {title}
          </h1>
          {description && (
            <h3 className="text-primary text-sm sm:text-md">{description}</h3>
          )}

          {Number(statuses?.length) > 0 && (
            <div className="mt-2 flex items-center gap-x-4 gap-y-1 flex-wrap">
              {statuses?.map((status, index) => {
                if (status.kind === 'separator') {
                  return <div key={index} className="border-r h-5" />;
                }

                const cnStatusIconWrapper = cn(
                  'flex items-center gap-1 shrink-0',
                  status.kind === 'dropdown' && 'cursor-pointer',
                  classNameStatusIconItem,
                );

                const cnStatusIconText = cn('text-primary text-xs sm:text-sm');

                if (status.kind === 'dropdown') {
                  return (
                    <HeaderItemDropdown
                      key={index}
                      classNameWrapper={cnStatusIconWrapper}
                      classNameText={cnStatusIconText}
                      {...status}
                    />
                  );
                }

                const { icon: Icon, text } = status;

                return (
                  <div key={index} className={cnStatusIconWrapper}>
                    <Icon className="w-4 h-4" />
                    <p className={cnStatusIconText}>{text}</p>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {rightAppend}

        {HeroIcon && !rightAppend && (
          <div>
            <HeroIcon className="w-6 h-6 sm:h-10 sm:w-10" />
          </div>
        )}
      </Card>

      {footnote && (
        <div className="px-3 sm:px-4 py-1">
          <FootnoteAs className="text-primary text-xs sm:text-sm">
            {footnote}
          </FootnoteAs>
        </div>
      )}
    </Card>
  );
}
