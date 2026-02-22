import dayjs from 'dayjs';

import { cn } from '@/shared/libs/tailwind/cn';

import type {
  FeedTimelineProps as Props,
  FeedTimelineRowDatestampProps as RowDatestampProps,
  FeedTimelineRowDetailProps as RowDetailProps,
  FeedTimelineRowGapProps as RowGapProps,
  FeedTimelineRowProps as RowProps,
} from './types';

export default function FeedTimeline(props: Props) {
  const { children } = props;

  return <ul role="list">{children}</ul>;
}

FeedTimeline.RowDatestamp = function RowDatestamp(props: RowDatestampProps) {
  const { timestamp } = props;

  return (
    <li className="sticky top-0 z-20 flex flex-col w-max ml-[28px]">
      <div className="w-[108px] flex justify-center">
        <p className="bg-slate-200 dark:bg-gray-800 rounded px-1.5 py-0.5 text-xs text-primary">
          {dayjs(timestamp).format('MMM D, YYYY')}
        </p>
      </div>
      <div
        className="relative top-0 bottom-0 left-1/2 h-3"
        aria-hidden="true"
      />
    </li>
  );
};

FeedTimeline.Row = function Row(props: RowProps) {
  const {
    classNameContentWrapper,
    classNameIcon,
    preformatContent,
    isLast,
    timestamp,
    content,
    icon: Icon,
  } = props;

  const elTime = dayjs(timestamp).format('HH:mm:ss');

  const cnIcon = cn('h-4 w-4 text-blue-600', classNameIcon);
  const cnContentWrapper = cn(
    'py-1 flex justify-between items-center gap-x-4',
    classNameContentWrapper,
  );

  return (
    <li className="relative grid grid-cols-[56px_32px_1fr] gap-x-2.5">
      <div className="flex justify-end items-center h-8">
        <time className="text-xs text-slate-400">{elTime}</time>
      </div>

      <div className="relative flex flex-col items-center">
        {!isLast && (
          <div
            className="absolute top-0 bottom-0 w-px bg-slate-200 dark:bg-primary/10"
            aria-hidden="true"
          />
        )}
        <div className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white dark:bg-gray-800">
          <Icon className={cnIcon} />
        </div>
      </div>

      <div className={cnContentWrapper}>
        {preformatContent ? (
          <p className="w-full text-sm leading-5.5 text-slate-500 flex flex-wrap">
            {content}
          </p>
        ) : (
          content
        )}
      </div>
    </li>
  );
};

FeedTimeline.RowDetail = function RowDetail(props: RowDetailProps) {
  const { children, classNameContent } = props;

  return (
    <li className="relative flex flex-col">
      <div className="absolute left-0 right-0 top-0 bottom-0 grid grid-cols-[56px_32px_1fr] gap-x-2.5">
        <div />
        <div className="relative w-8 h-full flex flex-col items-center">
          <div
            className="relative top-0 bottom-0 w-px h-full bg-slate-200 dark:bg-primary/10"
            aria-hidden="true"
          />
        </div>
        <div />
      </div>

      <div className="relative py-2 px-1">
        <div className={classNameContent}>{children}</div>
      </div>
    </li>
  );
};

FeedTimeline.RowGap = function RowGap(props: RowGapProps) {
  const cnLi = cn(
    'relative grid grid-cols-[56px_32px_1fr] gap-x-2.5 h-5',
    props.className,
  );

  return (
    <li className={cnLi}>
      <div />

      <div className="relative w-8 h-full flex flex-col items-center">
        <div
          className="absolute top-0 bottom-0 w-px bg-slate-200 dark:bg-primary/10"
          aria-hidden="true"
        />
      </div>

      <div />
    </li>
  );
};
