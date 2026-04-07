import { useDevetekTranslations } from '@/services/i18n';

import { cn } from '@/shared/libs/tailwind/cn';
import { Tooltip } from '@/shared/presentation/atoms/Tooltip';

import type { ResourceCardCompactSecondaryInfosProps as Props } from '../../rules/types/variant-compact';

export default function CompactSecondaryInfos(props: Props) {
  const { infos } = props;

  const t = useDevetekTranslations();

  const cnWrapper = cn('border-t h-full p-3 grid grid-cols-2 gap-x-2.5');

  return (
    <div className={cnWrapper}>
      {infos.map((info, index) => {
        const { icon: Icon, infoLabel, value } = info;

        const cnValue = cn('leading-5 line-clamp-1 truncate');

        return (
          <div key={index} className="flex flex-col cursor-default">
            <div className="flex items-center gap-x-1">
              <Icon className="size-3 shrink-0" />
              <p className="text-[0.625rem] sm:text-xs font-bold text-primary">
                {infoLabel}
              </p>
            </div>

            <Tooltip
              message={value}
              className="mt-0.5 text-xs sm:text-sm w-max max-w-full font-mono overflow-hidden flex items-center gap-x-1"
            >
              <p className={cnValue}>
                {value || (
                  <em className="opacity-50">{t('common.terms.unknown')}</em>
                )}
              </p>
            </Tooltip>
          </div>
        );
      })}
    </div>
  );
}
