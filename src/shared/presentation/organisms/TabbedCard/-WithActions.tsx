import type { CSSProperties } from 'react';
import { useState } from 'react';

import { cn } from '@/shared/libs/tailwind/cn';

import AnimatedSwitcher from '../../atoms/AnimatedSwitcher';
import type { Action, WithActionsProps as Props } from './-types';

export default function TabbedCardWithActions(props: Props) {
  const { actions, items } = props;

  const [activeId, setActiveId] = useState<string>();

  const styleTabWrapper: CSSProperties = {
    gridTemplateColumns: `repeat(${items.length}, 1fr)`,
  };

  return (
    <div className="bg-card/30 rounded-2xl shadow-xs border overflow-hidden">
      <div className="grid grid-cols-[1fr_auto]">
        <div
          className="-mb-px px-2 grid overflow-hidden w-full"
          style={styleTabWrapper}
        >
          {items.map((item, index) => {
            const isActive = activeId ? item.id === activeId : index === 0;

            const cnTab = cn(
              'relative h-11 pt-2 before:transition-all before:duration-300',
              'before:relative before:block before:bg-card before:size-full before:rounded-t-lg',
              'before:border before:border-b-0',
              'before:top-0 opacity-100 before:border-border before:shadow-sm',
              !isActive &&
                'before:top-2 before:opacity-0 before:border-transparent',
            );

            const cnTabContent = cn(
              'absolute left-1/2 top-1/2 -translate-x-1/2 transition-all before:duration-300',
              !isActive ? '-translate-y-1/2' : 'translate-y-[calc(-50%+4px)]',
            );

            return (
              <button
                key={item.id}
                type="button"
                className={cnTab}
                onClick={() => setActiveId(item.id)}
              >
                <span className={cnTabContent}>{item.label}</span>
              </button>
            );
          })}
        </div>

        <ActionsRow actions={actions} />
      </div>
      <div className="bg-card rounded-2xl rounded-tl-lg rounded-tr-none shadow-xs border-t">
        <AnimatedSwitcher.Carousel activeIdent={activeId || items[0]?.id}>
          {items.map((item) => (
            <AnimatedSwitcher.Carousel.Item
              key={item.id}
              as="div"
              ident={item.id}
              className="w-full h-full"
            >
              {item.content}
            </AnimatedSwitcher.Carousel.Item>
          ))}
        </AnimatedSwitcher.Carousel>
      </div>
    </div>
  );
}

interface ActionsRowProps {
  actions: Action[];
}

function ActionsRow(props: ActionsRowProps) {
  const { actions } = props;

  const cnButton = cn(
    'text-primary flex items-center gap-x-1',
    '[&>svg]:size-3.5 h-full px-2 rounded-sm rounded-tr-xl transition-all',
    'hover:bg-black/5 dark:hover:bg-white/10 active:bg-accent! active:text-white',
  );

  return (
    <div className="flex items-center gap-2 p-1 border-l">
      {actions.map((action) => (
        <button
          key={action.label}
          type="button"
          className={cnButton}
          onClick={action.onClick}
        >
          {action.icon && <action.icon />}
          {action.label}
        </button>
      ))}
    </div>
  );
}
