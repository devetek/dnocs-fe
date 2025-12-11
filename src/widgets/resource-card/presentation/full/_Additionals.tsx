import { ExternalLinkIcon } from 'lucide-react';

import { useDevetekTranslations } from '@/services/i18n';

import { cn } from '@/shared/libs/tailwind/cn';
import { Tooltip } from '@/shared/presentation/atoms/Tooltip';

import type {
  ResourceCardFullAdditionalsPrimeInfoProps as PrimeInfoProps,
  ResourceCardFullAdditionalsProps as Props,
  ResourceCardFullAdditionalsSecondaryInfosProps as SecondaryInfosProps,
} from '../../rules/types/variant-full';

export default function RCDAdditionals(props: Props) {
  const { className, children, slots } = props;

  const cnWrapper = cn(
    'border-l h-full p-3 grid gap-x-3',
    {
      'grid-cols-2': slots === 2,
      'grid-cols-3': slots === 3,
    },
    className,
  );

  return <div className={cnWrapper}>{children}</div>;
}

RCDAdditionals.PrimeInfo = function PrimeInfo(props: PrimeInfoProps) {
  const { title, titleIcon: TitleIcon, value, className, onClick } = props;

  const cnWrapper = cn('flex flex-col overflow-hidden', className);

  const t = useDevetekTranslations();

  const cnValue = cn('text-wrap leading-5 line-clamp-1 break-all', {
    'hover:underline cursor-default': !!onClick && !!value,
  });

  return (
    <div className={cnWrapper}>
      <div className="flex items-center gap-x-1">
        <TitleIcon className="size-3" />

        <p className="text-xs font-bold text-primary">
          {title.toLocaleUpperCase()}
        </p>
      </div>

      <Tooltip
        message={value}
        className="mt-1.5 text-sm w-max max-w-full font-mono overflow-hidden flex items-center gap-x-1"
      >
        <p className={cnValue} onClick={value ? onClick : undefined}>
          {value || <em className="opacity-50">{t('common.terms.unknown')}</em>}
        </p>

        {!!onClick && !!value && (
          <ExternalLinkIcon className="size-3 shrink-0" />
        )}
      </Tooltip>
    </div>
  );
};

RCDAdditionals.SecondaryInfos = function SecondaryInfos(
  props: SecondaryInfosProps,
) {
  const { infos } = props;

  const cnWrapper = cn('flex flex-col gap-0.5 overflow-hidden');

  const t = useDevetekTranslations();

  return (
    <div className={cnWrapper}>
      {infos.map((info, index) => {
        const { icon: Icon, infoLabel, value } = info;

        return (
          <Tooltip
            key={index}
            className="cursor-default flex items-center gap-0.5 w-max"
            message={infoLabel}
            passthrough
          >
            <Icon className="size-3 text-primary/70" />
            <p className="text-primary/70 text-xs break-all line-clamp-1">
              {value || (
                <em className="opacity-50">{t('common.terms.unknown')}</em>
              )}
            </p>
          </Tooltip>
        );
      })}
    </div>
  );
};
