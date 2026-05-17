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
              'px-2 py-1 mt-0 cursor-pointer transition-all',
              'rounded-tl-lg rounded-tr-lg border-l border-t border-r border-transparent',
              'text-primary font-medium',
              isActive && 'mt-2 bg-card shadow-sm border-border',
            );

            return (
              <button
                key={item.id}
                type="button"
                className={cnTab}
                onClick={() => setActiveId(item.id)}
              >
                {item.label}
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
