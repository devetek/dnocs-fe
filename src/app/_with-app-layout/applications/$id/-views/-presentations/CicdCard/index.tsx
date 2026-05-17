import { useMemo } from 'react';

import { cn } from '@/shared/libs/tailwind/cn';
import { Card } from '@/shared/presentation/atoms/Card';

import Actions from './-Actions';
import Footer from './-Footer';
import Placeholder from './-Placeholder';
import type { Props } from './-types';

export type * as CicdCardTypes from './-types';

export default function CicdCard(props: Props) {
  const {
    cardAccent = 'none',
    cardBadge,
    aside,
    headerAttributes,
    children,
  } = props;

  const cnCard = cn(
    'overflow-hidden shadow-none rounded-lg',
    'grid grid-cols-[minmax(0,1fr)_minmax(0,auto)]',
    {
      'border-blue-600/40': cardAccent === 'info',
      'border-green-600/40': cardAccent === 'success',
      'border-red-600/40': cardAccent === 'error',
      'border-yellow-600/40': cardAccent === 'warning',
      'border-orange-600/40': cardAccent === 'severe',
    },
  );

  const cnHeaderAttribute = cn(
    'text-xs font-semibold px-1 py-0.5 flex items-center shrink-0 gap-0.5 w-max overflow-hidden',
  );

  const renderedCardBadge = useMemo(() => {
    if (!cardBadge) return null;

    const { icon: Icon, label } = cardBadge;

    const cnCardBadge = cn(
      cnHeaderAttribute,
      'rounded-tr-[7px] rounded-bl-md py-1.5 pl-1.5 pr-2.5',
      'flex items-center gap-0.75',
      {
        'bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200':
          cardAccent === 'none',
        'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200':
          cardAccent === 'info',
        'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200':
          cardAccent === 'success',
        'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200':
          cardAccent === 'error',
        'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200':
          cardAccent === 'warning',
        'bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200':
          cardAccent === 'severe',
      },
    );

    return (
      <div className={cnCardBadge}>
        <Icon className="size-3.5" />
        {label}
      </div>
    );
  }, [cardBadge, cnHeaderAttribute, cardAccent]);

  return (
    <Card className={cnCard}>
      <div className="flex flex-col">
        <div className="pl-2 shrink-0 flex items-center gap-x-2.5 gap-y-1 overflow-hidden overflow-x-auto">
          {headerAttributes.map((attribute) => {
            const {
              icon: Icon,
              label,
              color = 'default',
              frame = 'none',
            } = attribute;

            const cnAttribute = cn(
              cnHeaderAttribute,
              'my-1',
              frame === 'none' && 'px-0',
              frame === 'none' && {
                'text-yellow-400': color === 'warning',
                'text-green-400': color === 'success',
                'text-red-400': color === 'error',
              },
              frame === 'solid' &&
                cn('rounded-sm text-2xs uppercase font-semibold', {
                  'text-yellow-700 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900':
                    color === 'warning',
                  'text-orange-700 dark:text-orange-400 bg-orange-100 dark:bg-orange-900':
                    color === 'severe',
                  'text-green-700 dark:text-green-400 bg-green-100 dark:bg-green-900':
                    color === 'success',
                  'text-red-700 dark:text-red-400 bg-red-100 dark:bg-red-900':
                    color === 'error',
                }),
            );

            const cnIcon = cn('size-3', frame === 'solid' && 'size-2.5');

            return (
              <div key={attribute.id} className={cnAttribute}>
                <Icon className={cnIcon} />
                {label}
              </div>
            );
          })}
        </div>

        {children}
      </div>

      <div className="flex flex-col">
        <div className="flex flex-row-reverse">{renderedCardBadge}</div>

        <div className="flex flex-col p-3">{aside}</div>
      </div>
    </Card>
  );
}

CicdCard.Actions = Actions;
CicdCard.Footer = Footer;
CicdCard.Placeholder = Placeholder;
