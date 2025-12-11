import { createScopeForSlot, extractSlots } from '@/shared/libs/react-children';
import { cn } from '@/shared/libs/tailwind/cn';
import { Card } from '@/shared/presentation/atoms/Card';

import type { ResourceCardCompactProps as Props } from '../../rules/types/variant-compact';

import CompactActions from './_Actions';
import CompactHeadnote from './_Footnote';
import CompactMain from './_Main';
import CompactSecondaryInfos from './_SecondaryInfos';
import CompactTertiaryInfos from './_TertiaryInfos';

const slotted = createScopeForSlot('@@ResourceCardCompact');

export default function ResourceCardCompact(props: Props) {
  const { classNameCardWrapper, classNameCardInner, children } = props;

  const [
    slotMain,
    slotSecondaryInfos,
    slotTertiaryInfos,
    slotActions,
    slotFootnote,
  ] = extractSlots(
    children,
    ResourceCardCompact.Main,
    ResourceCardCompact.SecondaryInfos,
    ResourceCardCompact.TertiaryInfos,
    ResourceCardCompact.Actions,
    ResourceCardCompact.Footnote,
  );

  const cnCardWrapper = cn(
    'rounded-xl bg-card/40 flex flex-col',
    classNameCardWrapper,
  );
  const cnCardInner = cn(
    'rounded-xl overflow-hidden border-0 border-b flex flex-col grow',
    classNameCardInner,
  );
  const cnFootnoteWrapper = cn('px-2 flex items-center w-full');

  return (
    <Card className={cnCardWrapper}>
      <Card className={cnCardInner}>
        <div className="grow">
          <section>{slotMain}</section>
          <section>{slotTertiaryInfos}</section>
          <section>{slotSecondaryInfos}</section>
        </div>
        <section>{slotActions}</section>
      </Card>

      <div className={cnFootnoteWrapper}>{slotFootnote}</div>
    </Card>
  );
}

ResourceCardCompact.Main = slotted('Main', CompactMain);
ResourceCardCompact.SecondaryInfos = slotted(
  'SecondaryInfos',
  CompactSecondaryInfos,
);
ResourceCardCompact.TertiaryInfos = slotted(
  'TertiaryInfos',
  CompactTertiaryInfos,
);
ResourceCardCompact.Actions = slotted('Actions', CompactActions);
ResourceCardCompact.Footnote = slotted('Footnote', CompactHeadnote);
