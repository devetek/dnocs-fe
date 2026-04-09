import { useDevetekTranslations } from '@/services/i18n';

import { cn } from '@/shared/libs/tailwind/cn';
import { Tooltip } from '@/shared/presentation/atoms/Tooltip';
import FramedImageWithBadge from '@/shared/presentation/molecules/FramedImageWithBadge';

import type {
  ResourceCardFullMainContentProps as ContentProps,
  ResourceCardFullMainHeroProps as HeroProps,
  ResourceCardFullMainProps as Props,
} from '../../rules/types/variant-full';

export default function RCDMain(props: Props) {
  const { className, children } = props;

  const cnWrapper = cn(
    'w-full h-full p-3 flex items-center gap-x-2',
    className,
  );

  return <div className={cnWrapper}>{children}</div>;
}

RCDMain.Hero = function Hero(props: HeroProps) {
  const {
    classNameWrapper,
    classNameImage,
    classNameBadge,
    image,
    badge,
    badgeTooltipMessage,
    tooltipMessage,
  } = props;

  return (
    <FramedImageWithBadge
      image={image}
      badge={badge}
      badgeTooltipMessage={badgeTooltipMessage}
      tooltipMessage={tooltipMessage}
      classNameBadge={classNameBadge}
      classNameImage={classNameImage}
      classNameWrapper={classNameWrapper}
      sizeUnit={12}
    />
  );
};

RCDMain.Content = function Content(props: ContentProps) {
  const { className, title, status, subStatus } = props;

  const t = useDevetekTranslations();

  const cnWrapper = cn(
    'flex flex-col justify-center overflow-hidden gap-0.5',
    className,
  );

  return (
    <div className={cnWrapper}>
      <Tooltip message={title}>
        <p className="font-bold text-sm sm:text-base break-all line-clamp-1 w-max max-w-full">
          {title || <em className="opacity-50">{t('common.terms.unknown')}</em>}
        </p>
      </Tooltip>
      {status && (
        <div className="flex items-center flex-wrap">
          {status.map((statusItem, index) => {
            if (!statusItem) return null;

            const { icon: Icon, text } = statusItem;

            return (
              <p
                key={index}
                className="text-primary/70 text-xs break-all line-clamp-1 flex items-center gap-0.5 pr-2"
              >
                <Icon className="size-3" />
                {text}
              </p>
            );
          })}
        </div>
      )}
      {subStatus && (
        <div className="flex items-center flex-wrap">
          {subStatus.map((subStatusItem, index) => {
            if (!subStatusItem) return null;

            const { icon: Icon, text } = subStatusItem;

            return (
              <p
                key={index}
                className="text-primary/50 text-[10px] break-all line-clamp-1 flex items-center gap-0.5 pr-2"
              >
                <Icon className="size-2.5" />
                {text}
              </p>
            );
          })}
        </div>
      )}
    </div>
  );
};
