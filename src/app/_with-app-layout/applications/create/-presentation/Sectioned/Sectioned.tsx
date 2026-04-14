import type { ReactNode } from 'react';

import { cn } from '@/shared/libs/tailwind/cn';
import { Card } from '@/shared/presentation/atoms/Card';

export default function Sectioned(props: Props) {
  const {
    className,
    classNameContent,
    sectionIcon: SectionIcon,
    sectionTitle,
    sectionDescription,
    children,
    withinCard,
    append,
  } = props;

  const content = (
    <div
      className={cn(
        'p-3 sm:px-5 sm:py-6 w-full flex gap-4 md:gap-8 flex-col md:flex-row overflow-hidden',
        className,
      )}
    >
      <div className="flex flex-col justify-between shrink-0 basis-[calc(40%_-_1rem)]">
        <div className="flex flex-col">
          {SectionIcon && (
            <div className="mb-2">
              <SectionIcon className="w-8 h-8" />
            </div>
          )}
          {sectionTitle && (
            <>
              <h3 className="text-xl font-bold">{sectionTitle}</h3>
              {sectionDescription && (
                <p className="text-sm">{sectionDescription}</p>
              )}
            </>
          )}
        </div>

        {append}
      </div>

      <div className={cn('basis-[calc(60%_-_1rem)]', classNameContent)}>
        {children}
      </div>
    </div>
  );

  if (!withinCard) {
    return content;
  }

  return <Card className="shadow-none rounded-2xl">{content}</Card>;
}

interface Props {
  withinCard?: boolean;
  className?: string;
  classNameContent?: string;
  sectionIcon?: (props: { className?: string }) => ReactNode;
  sectionTitle?: string;
  sectionDescription?: string;
  children: ReactNode;
  append?: ReactNode;
}
