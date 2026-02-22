import { ArrowRightIcon, CrosshairIcon, StarIcon } from 'lucide-react';

import { useDevetekTranslations } from '@/services/i18n';

import type { L7RuleRowProps, SubheadingProps } from './types';

const Subheading = (props: SubheadingProps) => {
  const { upstreamType, priority, trafficPercentage } = props;

  const elUpstreamType = upstreamType.replace('-', ' ').toLocaleUpperCase();

  return (
    <div className="flex items-center pl-1 pr-2.5 gap-x-3">
      <div className="w-max px-1 rounded-xs text-white bg-primary dark:bg-primary/20">
        <p className="text-[0.625rem] h-full font-bold">{elUpstreamType}</p>
      </div>

      <div className="grow" />

      <div className="py-1 w-max rounded-b-sm text-primary">
        <p className="text-[0.625rem] font-bold flex items-center gap-x-1">
          <CrosshairIcon className="size-3" />
          {trafficPercentage}
        </p>
      </div>
      <div className="py-1 w-max rounded-b-sm">
        <p className="text-[0.625rem] font-bold flex items-center gap-x-1">
          <StarIcon className="size-3 fill-[#eab308]" />P{priority}
        </p>
      </div>
    </div>
  );
};

export default function L7RuleRow(props: L7RuleRowProps) {
  const { upstreamRule } = props;

  const t = useDevetekTranslations();

  if (upstreamRule.type !== 'proxy-pass') {
    throw Error('TODO!');
  }

  const { backendTarget, matchingPath } = upstreamRule;

  const { address, port } = backendTarget.at(0) ?? {};

  if (address == null || port == null) {
    throw Error('TODO!');
  }

  return (
    <div className="bg-card/30 border shadow-xs rounded-sm overflow-hidden">
      <Subheading
        upstreamType="proxy-pass"
        priority={1}
        trafficPercentage="100%"
      />

      <div className="bg-card shadow-xs border-t rounded-sm overflow-hidden">
        <div className="px-3.5 py-2.5 w-full grid grid-cols-[1.75fr_auto_2fr] gap-x-2">
          <div className="flex flex-col">
            <h6 className="font-semibold text-primary/70 text-[0.7rem]">
              {t('sidepanel.loadBalancerDetails.pathPattern')}
            </h6>
            <code className="font-semibold text-primary text-sm break-all">
              {matchingPath}
            </code>
          </div>
          <div className="flex items-center justify-center">
            <ArrowRightIcon className="text-primary/80" />
          </div>
          <div className="flex flex-col">
            <h6 className="font-semibold text-primary/70 text-[0.7rem]">
              Target ({address.protocol.toLocaleUpperCase()})
            </h6>
            <code className="font-semibold text-primary text-sm tracking-tighter break-all">
              {address.hostname}:<span className="opacity-70">{port}</span>
            </code>
          </div>
        </div>
      </div>
    </div>
  );
}
