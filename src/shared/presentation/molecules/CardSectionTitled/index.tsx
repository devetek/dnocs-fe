import { ChevronDownIcon } from 'lucide-react';

import { f } from '@/shared/libs/browser/fn';
import useToggle from '@/shared/libs/react-hooks/useToggle';
import { cn } from '@/shared/libs/tailwind/cn';

import { Card } from '../../atoms/Card';
import { FreestandingAccordion } from '../../atoms/FreestandingAccordion';
import type { Props } from './-types';

export type * as CardSectionTitledTypes from './-types';

export default function CardSectionTitled(props: Props) {
  const {
    classNameWrapper,
    classNameChildrenWrapper,
    children,
    icon: Icon,
    isCollapsible,
    defaultCollapsed,
    title,
    placement,
    toolbarActions,
    toolbarContent,
  } = props;

  const [isCollapsed, toggleIsCollapsed] = useToggle(defaultCollapsed);

  const elToolbarActions = f(() => {
    const cnTbActWrapper = cn('border-l ml-1 h-full flex items-center', {
      'py-2 pl-2': placement === 'main',
      'py-1 pl-1': placement === 'aside',
    });

    const cnTbButton = cn(
      'text-primary flex items-center gap-x-1',
      '[&>svg]:size-3.5 h-full px-2 rounded-sm transition-all',
      'p-2 hover:bg-black/5 dark:hover:bg-white/10 active:bg-accent! active:text-white',
      !toolbarActions &&
        !toolbarContent && {
          'rounded-tr-xl': placement === 'aside',
          'rounded-br-xl': placement === 'aside' && isCollapsed,
        },
    );

    const cnActButton = cn(cnTbButton, {
      'rounded-tr-xl': placement === 'aside',
      'rounded-br-xl': placement === 'aside' && isCollapsed,
    });

    const toolbar = f(() => {
      if (toolbarContent) return toolbarContent;
      if (!toolbarActions) return null;
      const { label, icon: Icon, onClick } = toolbarActions;

      return (
        <button type="button" className={cnActButton} onClick={onClick}>
          {Icon && <Icon />}
          {label}
        </button>
      );
    });

    return (
      <div className="h-full flex items-center">
        {isCollapsible && (
          <div className="p-2 pr-0">
            <button
              type="button"
              className={cnTbButton}
              onClick={toggleIsCollapsed}
            >
              <ChevronDownIcon
                data-collapsed={isCollapsed}
                className="transition-all data-[collapsed=true]:rotate-180"
              />
            </button>
          </div>
        )}

        {toolbar && <div className={cnTbActWrapper}>{toolbar}</div>}
      </div>
    );
  });

  const cnWrapper = cn(
    'flex flex-col',
    'bg-card/30 rounded-2xl border',
    classNameWrapper,
  );

  const cnHeaderWrapper = cn('flex items-center justify-between', {
    'pl-4 pr-2 h-12': placement === 'main',
    'pl-3 pr-1 h-10': placement === 'aside',
  });

  const cnChildrenWrapper = cn(
    'overflow-x-auto flex items-center flex-wrap',
    'bg-card rounded-2xl rounded-tl-lg rounded-tr-none border-t',
    {
      'p-4': placement === 'main',
      'px-4 py-3': placement === 'aside',
    },
    classNameChildrenWrapper,
  );

  return (
    <Card className={cnWrapper}>
      <div className={cnHeaderWrapper}>
        <div className="flex gap-1.5 items-center">
          <Icon
            className="data-[placement=main]:size-5 data-[placement=aside]:size-4"
            data-placement={placement}
          />

          <h3 className="font-medium text-primary">{title}</h3>
        </div>

        {elToolbarActions}
      </div>

      <FreestandingAccordion isOpen={!isCollapsed}>
        <div className={cnChildrenWrapper}>{children}</div>
      </FreestandingAccordion>
    </Card>
  );
}
