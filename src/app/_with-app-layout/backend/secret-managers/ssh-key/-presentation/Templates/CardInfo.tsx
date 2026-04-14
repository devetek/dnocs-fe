import type { JSX, ReactNode } from 'react';

import { Tooltip } from '@/shared/presentation/atoms/Tooltip';

export default function TemplateCardInfo(props: TemplateCardInfoProps) {
  const {
    title,
    subtitle,
    logoAreaMain,
    logoAreaMainTooltip,
    additionalInfos,
  } = props;

  return (
    <div className="flex flex-col">
      <div className="py-2.5 px-3 border-b flex justify-between gap-3 md:gap-6 min-h-14">
        <div className="flex flex-col gap-1">
          <h3 className="font-bold text-sm break-all">{title}</h3>
          <h5 className="font-semibold text-sm break-all opacity-70">
            {subtitle}
          </h5>
        </div>

        <div className="w-6 h-6 relative shrink-0">
          <Tooltip message={logoAreaMainTooltip}>{logoAreaMain}</Tooltip>
        </div>
      </div>

      <div className="py-2 px-3">
        <div className="flex flex-col gap-y-1">
          {additionalInfos.map((additional, idx) => {
            const { icon, text, iconTooltip } = additional;

            return (
              <div key={idx} className="flex items-center gap-1">
                <Tooltip message={iconTooltip}>{icon}</Tooltip>
                <p className="text-sm">{text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export interface TemplateCardInfoProps {
  title: ReactNode;
  subtitle?: ReactNode;
  logoAreaMain: JSX.Element;
  logoAreaMainTooltip: string;
  additionalInfos: AdditionalInfo[];
}

export interface AdditionalInfo {
  icon: JSX.Element;
  iconTooltip: string;
  text: string;
}
