import { ExternalLinkIcon } from 'lucide-react';

import { useDevetekTranslations } from '@/services/i18n';

import { cn } from '@/shared/libs/tailwind/cn';

import type {
  ResourceCardFullFootnoteItemProps as ItemProps,
  ResourceCardFullFootnoteProps as Props,
} from '../../rules/types/variant-full';

export default function RCDFootnote(props: Props) {
  const { className, children } = props;

  const cnWrapper = cn('flex items-center gap-x-3 w-full', className);

  return <div className={cnWrapper}>{children}</div>;
}

RCDFootnote.Item = function Item(props: ItemProps) {
  const {
    classNameWrapper,
    classNameValueWrapper,
    style,
    label,
    labelIcon: LabelIcon,
    value,
    valueIcon: ValueIcon,
    onClick,
  } = props;

  const t = useDevetekTranslations();

  const cnWrapper = cn(
    'text-primary/70 text-xs break-all line-clamp-1 flex items-center gap-1',
    classNameWrapper,
  );
  const cnLabelWrapper = cn('flex items-center gap-0.5');
  const cnValueWrapper = cn(
    'flex items-center gap-0.5',
    {
      'cursor-pointer hover:underline': !!onClick,
    },
    classNameValueWrapper,
  );

  return (
    <p className={cnWrapper} style={style?.wrapper}>
      <span className={cnLabelWrapper}>
        {LabelIcon && <LabelIcon className="size-3" />}
        {label}:{' '}
      </span>
      <span
        className={cnValueWrapper}
        style={style?.valueWrapper}
        onClick={onClick}
      >
        {ValueIcon && <ValueIcon className="size-3" />}
        {value || t('common.terms.unknown')}

        {!!onClick && <ExternalLinkIcon className="size-2" />}
      </span>
    </p>
  );
};

RCDFootnote.Spacer = function Spacer() {
  return <div className="grow" />;
};
