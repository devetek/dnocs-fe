import { createScopeForSlot, extractSlots } from '@/shared/libs/react-children';
import { cn } from '@/shared/libs/tailwind/cn';
import { Card } from '@/shared/presentation/atoms/Card';

import type { ResourceCardFullProps as Props } from '../../rules/types/variant-full';

import RCDActions from './_Actions';
import RCDAdditionals from './_Additionals';
import RCDFootnote from './_Footnote';
import RCDMain from './_Main';

const slotted = createScopeForSlot('@@ResourceCardFull');

export default function ResourceCardFull(props: Props) {
  const { classNameCardWrapper, classNameCardInner, onClickBody, children } = props;

  const [slotMain, slotAdditionals, slotActions, slotFootnote] = extractSlots(
    children,
    ResourceCardFull.Main,
    ResourceCardFull.Additionals,
    ResourceCardFull.Actions,
    ResourceCardFull.Footnote,
  );

  const cnCardWrapper = cn(
    'rounded-xl min-w-[800px] bg-card/40',
    classNameCardWrapper,
  );
  const cnCardInner = cn(
    'rounded-xl overflow-hidden border-0 border-b grid grid-cols-[minmax(0,1fr)_1.2fr_auto]',
    classNameCardInner,
  );
  const cnFooterWrapper = cn('px-3 py-1 flex items-center w-full');

  return (
    <Card className={cnCardWrapper}>
      <Card className={cnCardInner}>
        <section className={cn(onClickBody && 'cursor-pointer')} onClick={onClickBody}>{slotMain}</section>
        <section className={cn(onClickBody && 'cursor-pointer')} onClick={onClickBody}>{slotAdditionals}</section>
        <section>{slotActions}</section>
      </Card>

      <div className={cnFooterWrapper}>{slotFootnote}</div>
    </Card>
  );
}

ResourceCardFull.Main = slotted('Main', RCDMain);
ResourceCardFull.Additionals = slotted('Additionals', RCDAdditionals);
ResourceCardFull.Additionals.PrimeInfo = RCDAdditionals.PrimeInfo;
ResourceCardFull.Additionals.PrimeInfoList = RCDAdditionals.PrimeInfoList;
ResourceCardFull.Additionals.SecondaryInfos = RCDAdditionals.SecondaryInfos;
ResourceCardFull.Actions = slotted('Actions', RCDActions);
ResourceCardFull.Footnote = slotted('Footnote', RCDFootnote);
