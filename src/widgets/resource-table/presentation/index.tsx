import type { CSSProperties } from 'react';
import { Fragment, useState } from 'react';

import { useDevetekTranslations } from '@/services/i18n';

import { cn } from '@/shared/libs/tailwind/cn';
import { FreestandingAccordion } from '@/shared/presentation/atoms/FreestandingAccordion';

import type { Props } from '../rules/-types';

export default function ResourceTable<D>(props: Props<D>) {
  const {
    className,
    data,
    columns,
    size = 'normal',
    rowPrepend: RowPrepend,
    rowAppend: RowAppend,
  } = props;

  const [showPrependForIndexes, setShowPrependForIndexes] = useState<number[]>(
    [],
  );
  const [showAppendForIndexes, setShowAppendForIndexes] = useState<number[]>(
    [],
  );

  const t = useDevetekTranslations();

  const styleShared: CSSProperties = {
    gridTemplateColumns: columns
      .map((column) => `minmax(0,${column.width || '1fr'})`)
      .join(' '),
  };

  const cnShared = cn('grid gap-x-4.5 items-center');

  const cnTableHeading = cn(cnShared, 'w-full py-1 items-center', {
    'px-4': size === 'normal',
    'px-3': size === 'sm',
  });

  const cnWrapper = cn(
    'w-full bg-gray-50 dark:bg-background/50 shadow border rounded-xl',
    className,
  );

  return (
    <div className={cnWrapper}>
      <div className={cnTableHeading} style={styleShared}>
        {columns.map((column) => {
          const { header: Header } = column;

          if (typeof Header === 'string') {
            let parsedContent = Header;

            if (parsedContent.startsWith('@')) {
              const i18nKey = parsedContent.split('@', 2)[1];

              if (i18nKey && t.has(i18nKey)) {
                parsedContent = t(i18nKey);
              }
            }

            return (
              <p
                key={column.key}
                className="text-primary/70 text-xs font-semibold"
              >
                {parsedContent.toLocaleUpperCase()}
              </p>
            );
          }

          const rendered =
            typeof Header === 'function' ? (
              <Header t={t} data={data} />
            ) : (
              Header
            );

          return <Fragment key={column.key}>{rendered}</Fragment>;
        })}
      </div>

      <div className="bg-card rounded-xl shadow border-t px-1.5 py-0.5 flex flex-col">
        {data.map((row, index) => {
          const isOdd = Boolean(index % 2);
          const isLast = data.length > 1 && index === data.length - 1;

          const cnWrapper = cn(
            'flex flex-col',
            'border border-transparent rounded-md',
            isOdd && 'bg-background',
          );

          const cnContentWrapper = cn(
            cnShared,
            'py-2.5',

            {
              'py-2.5 px-2.5': size === 'normal',
              'py-1.5 px-1.5': size === 'sm',
            },
          );

          const isPrependOpen = showPrependForIndexes.includes(index);
          const isAppendOpen = showAppendForIndexes.includes(index);

          return (
            <Fragment key={index}>
              <div className={cnWrapper}>
                {RowPrepend && (
                  <FreestandingAccordion isOpen={isPrependOpen}>
                    <RowPrepend row={row} data={data} index={index} />
                  </FreestandingAccordion>
                )}

                <div className={cnContentWrapper} style={styleShared}>
                  {columns.map(({ key, content: Content }) => {
                    const handleClickViewPrepend = (show?: boolean) => {
                      const shouldShow = show != null ? show : !isPrependOpen;

                      setShowPrependForIndexes((prev) =>
                        shouldShow
                          ? [...prev, index]
                          : prev.filter((it) => it !== index),
                      );
                    };

                    const handleClickViewAppend = (show?: boolean) => {
                      const shouldShow = show != null ? show : !isAppendOpen;

                      setShowAppendForIndexes((prev) =>
                        shouldShow
                          ? [...prev, index]
                          : prev.filter((it) => it !== index),
                      );
                    };

                    return (
                      <Content
                        key={`${index}-${key}`}
                        data={data}
                        row={row}
                        index={index}
                        showPrepend={isPrependOpen}
                        showAppend={isAppendOpen}
                        onViewPrepend={handleClickViewPrepend}
                        onViewAppend={handleClickViewAppend}
                      />
                    );
                  })}
                </div>

                {RowAppend && (
                  <FreestandingAccordion isOpen={isAppendOpen}>
                    <RowAppend row={row} data={data} index={index} />
                  </FreestandingAccordion>
                )}
              </div>

              {isLast && isOdd && <div className="h-1" />}
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}
