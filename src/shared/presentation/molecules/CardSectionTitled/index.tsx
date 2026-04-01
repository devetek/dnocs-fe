import { iife } from '@/shared/libs/browser/fn';
import { cn } from '@/shared/libs/tailwind/cn';

import { Button } from '../../atoms/Button';
import { Card } from '../../atoms/Card';

import type { CardSectionTitledProps } from './types';

export default function CardSectionTitled(props: CardSectionTitledProps) {
  const {
    classNameWrapper,
    children,
    icon: Icon,
    title,
    placement,
    toolbarActions,
    toolbarContent,
  } = props;

  const elToolbarActions = iife(() => {
    if (toolbarContent) return toolbarContent;
    if (!toolbarActions) return null;
    const { label, onClick } = toolbarActions;

    return (
      <Button size="sm" variant="outline" onClick={onClick}>
        {label}
      </Button>
    );
  });

  const cnWrapper = cn('rounded-2xl flex flex-col', classNameWrapper);

  const cnHeaderWrapper = cn('flex items-center justify-between border-b', {
    'px-4 h-12': placement === 'main',
    'px-3 h-10': placement === 'aside',
  });

  const cnChildrenWrapper = cn('overflow-x-auto flex items-center flex-wrap', {
    'p-4': placement === 'main',
    'px-4 py-3': placement === 'aside',
  });

  return (
    <Card className={cnWrapper}>
      <div className={cnHeaderWrapper}>
        <div className="flex gap-1.5 items-center">
          <Icon
            className="data-[placement=main]:size-6 data-[placement=aside]:size-5"
            data-placement={placement}
          />

          <h3 className="font-bold">{title}</h3>
        </div>

        {elToolbarActions}
      </div>

      <div className={cnChildrenWrapper}>{children}</div>
    </Card>
  );
}
