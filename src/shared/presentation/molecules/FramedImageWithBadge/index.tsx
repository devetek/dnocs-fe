import { iife } from '@/shared/libs/browser/iife';
import { cn } from '@/shared/libs/tailwind/cn';

import { Tooltip } from '../../atoms/Tooltip';

import type {
  ParsedSizeUnit,
  FramedImageWithBadgeProps as Props,
  SizeUnit,
} from './types';

const parseSizeUnit = (sizeUnit: SizeUnit): ParsedSizeUnit => {
  switch (sizeUnit) {
    case 14:
      return {
        cnBadgeSize: 'size-5',
        cnImageSize: 'size-11',
        cnWrapperSize: 'size-14',
      };

    case 12:
      return {
        cnBadgeSize: 'size-4',
        cnImageSize: 'size-9',
        cnWrapperSize: 'size-12',
      };

    case 9:
      return {
        cnBadgeSize: 'size-3',
        cnImageSize: 'size-6.5',
        cnWrapperSize: 'size-9',
      };
  }
};

export default function FramedImageWithBadge(props: Props) {
  const {
    classNameWrapper,
    classNameImage,
    classNameBadge,
    image: TargetImg,
    badge: Badge,
    sizeUnit = 12,
    badgeTooltipMessage,
    tooltipMessage,
  } = props;

  const sizeCn = parseSizeUnit(sizeUnit);

  const cnWrapper = cn(
    'shrink-0 overflow-hidden rounded-md bg-background border flex items-center justify-center relative',
    sizeCn.cnWrapperSize,
    classNameWrapper,
  );

  const elImage = iife(() => {
    if (typeof TargetImg === 'string') {
      return (
        <img
          src={TargetImg}
          alt="Hero"
          className={cn(sizeCn.cnImageSize, classNameImage)}
        />
      );
    }

    return <TargetImg className={cn(sizeCn.cnImageSize, classNameImage)} />;
  });

  const elBadge = iife(() => {
    if (!Badge) return null;

    const cnBadgeWrapper = cn(
      'absolute bottom-0 right-0 bg-card/60 backdrop-blur-xs rounded-[12px_0_5px_0] pt-1 pl-1 pr-0.5 pb-0.5 shadow',
      classNameBadge,
    );

    return (
      <Tooltip className={cnBadgeWrapper} message={badgeTooltipMessage}>
        <Badge className={sizeCn.cnBadgeSize} />
      </Tooltip>
    );
  });

  return (
    <Tooltip className={cnWrapper} message={tooltipMessage}>
      {elImage}
      {elBadge}
    </Tooltip>
  );
}
