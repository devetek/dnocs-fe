import { useMemo, useState } from 'react';

import {
  SiFirefox,
  SiGooglechrome,
  SiOpera,
  SiSafari,
} from '@icons-pack/react-simple-icons';
import dayjs from 'dayjs';
import {
  BotIcon,
  ChevronDownIcon,
  CircleQuestionMarkIcon,
  EllipsisIcon,
  HatGlassesIcon,
  InfoIcon,
} from 'lucide-react';

import type { LoggingRichCaddyLb } from '@/entities/logging-rich/caddy-lb/rules/schema';

import { cn } from '@/shared/libs/tailwind/cn';
import { FreestandingAccordion } from '@/shared/presentation/atoms/FreestandingAccordion';
import FeedTimeline from '@/shared/presentation/organisms/FeedTimeline';

import type {
  TimelineItemAdvancedCardProps,
  TimelineItemDetailsProps,
  TimelineProps,
  UAIconProps,
} from './types';

const UAIcon = (props: UAIconProps) => {
  const { $ua, ...rest } = props;

  if ($ua.identified === 'unknown') {
    return <HatGlassesIcon {...rest} />;
  }

  if ($ua.identified === 'bot') {
    return <BotIcon {...rest} />;
  }

  switch ($ua.known) {
    case 'edge':
    case 'chromium':
    case 'chrome':
      return <SiGooglechrome {...rest} />;

    case 'firefox':
      return <SiFirefox {...rest} />;

    case 'opera':
      return <SiOpera {...rest} />;

    case 'safari':
      return <SiSafari {...rest} />;

    default:
      return <CircleQuestionMarkIcon {...rest} />;
  }
};

const TimelineItemDetails = (props: TimelineItemDetailsProps) => {
  const { timelineItem, showTechnicals, onClickViewTechnicals } = props;
  const { requestPayload, requester } = timelineItem;

  const cnStatusLabel = cn(
    'font-semibold leading-5! text-[0.65rem] px-1.5 h-5 rounded-[999px]',
    {
      'bg-blue-200 text-blue-950 dark:bg-blue-800 dark:text-blue-200':
        requestPayload.status < 200,
      'bg-green-200 text-green-950 dark:bg-green-800 dark:text-green-200':
        requestPayload.status >= 200 && requestPayload.status < 300,
      'bg-amber-200 text-amber-950 dark:bg-amber-800 dark:text-amber-200':
        requestPayload.status >= 300 && requestPayload.status < 400,
      'bg-red-200 text-red-950 dark:bg-red-800 dark:text-red-200':
        requestPayload.status >= 400 && requestPayload.status < 500,
      'bg-purple-200 text-purple-950 dark:bg-purple-800 dark:text-purple-200':
        requestPayload.status >= 500,
    },
  );

  return (
    <span className="flex flex-col w-full">
      <button
        className="flex flex-col leading-6 group w-full"
        onClick={onClickViewTechnicals}
      >
        <span className="flex items-center gap-x-1.25">
          <span className="font-bold text-primary">
            {requestPayload.method.toLocaleUpperCase()}
          </span>
          <span className={cnStatusLabel}>{requestPayload.status}</span>
          <span className="text-sm">→</span>
          <span className="font-medium text-primary overflow-hidden line-clamp-1 break-all">
            {requestPayload.uriPath}
          </span>
        </span>

        <span className="flex items-center gap-x-1.25">
          <span className="text-sm">to</span>
          <code className="text-sm tracking-[-0.06em] flex items-center gap-x-1">
            {requester.originIp},
          </code>

          <span className="text-sm">by</span>
          <UAIcon
            $ua={requester.userAgent}
            className="size-3.5 data-[rogue=true]:text-red-500"
            data-rogue={requester.userAgent.identified === 'unknown'}
          />
          <span className="group-hover:text-blue-500">
            <EllipsisIcon
              className="size-3.5 data-[show=true]:hidden group-hover:hidden"
              data-show={showTechnicals}
            />
            <ChevronDownIcon
              className="size-3.5 transition-all hidden data-[show=true]:block data-[show=true]:rotate-180 group-hover:block"
              data-show={showTechnicals}
            />
          </span>
        </span>
      </button>
    </span>
  );
};

const TimelineItemAdvancedCard = (props: TimelineItemAdvancedCardProps) => {
  const { requestPayload, requester } = props.timelineItem;

  const elUaString = useMemo(() => {
    if (requester.userAgent.identified === 'unknown') {
      return '(Unknown) ⚠️';
    }

    const [before, after] = requester.userAgent.raw.split(
      requester.userAgent.isolatedRfc7231,
    );

    return (
      <span>
        <span>{before}</span>
        <span className="text-blue-500 font-semibold">
          {requester.userAgent.identified == 'bot' ? '🤖' : '👀'}{' '}
          {requester.userAgent.isolatedRfc7231}
        </span>
        <span>{after}</span>
      </span>
    );
  }, [
    requester.userAgent.identified,
    requester.userAgent.isolatedRfc7231,
    requester.userAgent.raw,
  ]);

  return (
    <div className="bg-card border rounded-md shadow-md/5">
      <div className="py-1 px-2 border-b">
        <p className="text-xs leading-5">
          <span className="font-semibold text-primary bg-primary/10 px-1 py-0.5 rounded-sm">
            TARGET PATH
          </span>{' '}
          <code className="tracking-tighter break-all">
            {requestPayload.uriPath}
          </code>
        </p>
      </div>

      <div className="py-1 px-2 border-b">
        <p className="text-xs leading-5">
          <span className="font-semibold text-primary bg-primary/10 px-1 py-0.5 rounded-sm">
            UASTRING
          </span>{' '}
          <code className="tracking-tighter break-all">{elUaString}</code>
        </p>
      </div>
    </div>
  );
};

export default function Timeline(props: TimelineProps) {
  const { timeline } = props;

  const [showTechnicalsAtId, setShowTechnicalsAtId] = useState<string>();

  const groupedTimeline = useMemo(() => {
    const constructed: Record<string, LoggingRichCaddyLb[]> = {};

    for (const timelineItem of timeline) {
      const currentDay = dayjs(timelineItem.timestamp.updated).format(
        'YYYY-MM-DD',
      );

      constructed[currentDay] ??= [];
      constructed[currentDay].push(timelineItem);
    }

    return Object.entries(constructed);
  }, [timeline]);

  return (
    <FeedTimeline>
      {groupedTimeline.map(([tlDatestamp, tlCollections], tlIndex) => {
        return (
          <>
            {tlIndex !== 0 && <FeedTimeline.RowGap />}

            <FeedTimeline.RowDatestamp
              timestamp={dayjs(tlDatestamp).toDate()}
            />
            {tlCollections.map((tl, index) => {
              const { timestamp, idGenerated } = tl;

              const handleClickViewTechnicals = () => {
                setShowTechnicalsAtId(
                  showTechnicalsAtId !== idGenerated ? idGenerated : undefined,
                );
              };

              const showTechnicals = showTechnicalsAtId === idGenerated;

              return (
                <>
                  <FeedTimeline.Row
                    timestamp={timestamp.updated}
                    icon={InfoIcon}
                    classNameIcon="text-blue-500"
                    preformatContent
                    isLast={
                      tlIndex === groupedTimeline.length - 1 &&
                      index === tlCollections.length - 1
                    }
                    content={
                      <TimelineItemDetails
                        timelineItem={tl}
                        showTechnicals={showTechnicals}
                        onClickViewTechnicals={handleClickViewTechnicals}
                      />
                    }
                  />

                  <FreestandingAccordion
                    isOpen={showTechnicals}
                    durationMs={200}
                  >
                    <FeedTimeline.RowDetail>
                      <TimelineItemAdvancedCard timelineItem={tl} />
                    </FeedTimeline.RowDetail>
                    <FeedTimeline.RowGap className="h-2" />
                  </FreestandingAccordion>

                  <FeedTimeline.RowGap className="h-2" />
                </>
              );
            })}
          </>
        );
      })}
    </FeedTimeline>
  );
}
