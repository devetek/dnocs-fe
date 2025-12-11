import { useDevetekTranslations } from '@/services/i18n';

import { cn } from '@/shared/libs/tailwind/cn';
import { Tooltip } from '@/shared/presentation/atoms/Tooltip';
import FramedImageWithBadge from '@/shared/presentation/molecules/FramedImageWithBadge';

import type {
  ResourceCardCompactMainContentProps as ContentProps,
  ResourceCardCompactMainHeroProps as HeroProps,
  ResourceCardCompactMainProps as Props,
} from '../../rules/types/variant-compact';

export default function CompactMain(props: Props) {
  const { className, children } = props;

  const cnWrapper = cn('w-full h-full p-3 flex items-start gap-x-2', className);

  return <div className={cnWrapper}>{children}</div>;
}

CompactMain.Hero = function Hero(props: HeroProps) {
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
      sizeUnit={9}
    />
  );
};

CompactMain.Content = function Content(props: ContentProps) {
  const { className, title, status } = props;

  const t = useDevetekTranslations();

  const cnWrapper = cn(
    'flex flex-col justify-center overflow-hidden gap-0.5',
    className,
  );

  return (
    <div className={cnWrapper}>
      <Tooltip message={title}>
        <p className="font-bold text-xs sm:text-sm break-all line-clamp-2 w-max max-w-full">
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
                className="text-primary/70 text-[0.625rem] sm:text-xs break-all line-clamp-1 flex items-center gap-0.5 pr-2"
              >
                <Icon className="size-2.5 sm:size-3 shrink-0" />
                <span className="line-clamp-1">{text}</span>
              </p>
            );
          })}
        </div>
      )}
    </div>
  );
};
