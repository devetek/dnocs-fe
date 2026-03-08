import { ExternalLinkIcon, InfoIcon } from 'lucide-react';

import { useDevetekTranslations } from '@/services/i18n';

import { iife } from '@/shared/libs/browser/fn';
import CardSectionTitled from '@/shared/presentation/molecules/CardSectionTitled';

import type {
  AppInformationLayoutFrameProps as FrameProps,
  AppInformationLayoutRowProps as RowProps,
  AppInformationLayoutTwoColsProps as TwoColsProps,
} from './types';

function Frame(props: FrameProps) {
  const { children } = props;

  const t = useDevetekTranslations();

  return (
    <CardSectionTitled
      placement="aside"
      title={t('common.terms.information')}
      icon={InfoIcon}
    >
      <div className="flex flex-col gap-y-4 w-full">{children}</div>
    </CardSectionTitled>
  );
}

function TwoCols(props: TwoColsProps) {
  const { children } = props;

  return <div className="grid grid-cols-2 gap-4 w-full">{children}</div>;
}

function Row(props: RowProps) {
  const { label, value, link } = props;

  const elValue = iife(() => {
    if (link) {
      return (
        <a
          className="flex items-center gap-1"
          href={link}
          target="_blank"
          rel="noopener noreferer"
        >
          <p className="text-sm font-bold hover:underline">{value}</p>
          <ExternalLinkIcon className="w-3 h-3" />
        </a>
      );
    }

    return <p className="text-sm font-bold">{value}</p>;
  });

  return (
    <div className="flex flex-col w-full">
      <p className="text-xs text-primary">{label}</p>

      {elValue}
    </div>
  );
}

export const AppInformationLayout = {
  Frame,
  TwoCols,
  Row,
};
