import { useDevetekTranslations } from '@/services/i18n';

import { cn } from '@/shared/libs/tailwind/cn';
import { Tooltip } from '@/shared/presentation/atoms/Tooltip';

import type { ResourceCardCompactTertiaryInfosProps as Props } from '../../rules/types/variant-compact';

export default function CompactTertiaryInfos(props: Props) {
  const { infos } = props;

  const t = useDevetekTranslations();

  const cnWrapper = cn(
    'border-t h-full p-3 grid grid-cols-[auto_auto_auto] gap-x-2',
  );

  return (
    <div className={cnWrapper}>
      {infos.map((info, index) => {
        const { icon: Icon, infoLabel, value } = info;

        return (
          <Tooltip
            key={index}
            className="flex items-center gap-0.5"
            message={`${infoLabel}: ${value}`}
          >
            <Icon className="size-3 shrink-0" />

            <p className="text-[0.625rem] sm:text-xs line-clamp-1">
              {value || (
                <em className="opacity-50">{t('common.terms.unknown')}</em>
              )}
            </p>
          </Tooltip>
        );
      })}
    </div>
  );
}
