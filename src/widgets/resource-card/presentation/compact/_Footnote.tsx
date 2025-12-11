import { ExternalLinkIcon } from 'lucide-react';

import { useDevetekTranslations } from '@/services/i18n';

import { cn } from '@/shared/libs/tailwind/cn';
import { Tooltip } from '@/shared/presentation/atoms/Tooltip';

import type {
  ResourceCardCompactFootnoteItemProps as ItemProps,
  ResourceCardCompactFootnoteProps as Props,
  ResourceCardCompactFootnoteStatusIconsProps as StatusIconsProps,
} from '../../rules/types/variant-compact';

export default function CompactFootnote(props: Props) {
  const { className, children } = props;

  const cnWrapper = cn(
    'border-b py-1 flex items-center justify-start gap-x-1 w-full overflow-hidden',
    className,
  );

  return <div className={cnWrapper}>{children}</div>;
}

CompactFootnote.StatusIcons = function StatusIcons(props: StatusIconsProps) {
  const { classNameWrapper, tooltipMessage, icons, onClick } = props;

  const cnWrapper = cn(
    'text-primary/70 text-xs break-all line-clamp-1 flex items-center gap-x-1',
    classNameWrapper,
  );

  return (
    <Tooltip
      className={cnWrapper}
      message={tooltipMessage}
      asProps={{ onClick }}
    >
      {icons.map((Icon, index) => (
        <Icon key={index} className="size-3.5 shrink-0" />
      ))}
    </Tooltip>
  );
};

CompactFootnote.Item = function Item(props: ItemProps) {
  const {
    classNameValueWrapper,
    classNameWrapper,
    label,
    value,
    icon: Icon,
    style,
    onClick,
  } = props;

  const t = useDevetekTranslations();

  const cnWrapper = cn(
    'text-primary/70 text-[0.625rem] break-all line-clamp-1 flex items-center gap-0.5',
    {
      'hover:underline cursor-pointer': !!onClick,
    },
    classNameWrapper,
  );

  const cnValueWrapper = cn(
    'flex items-center gap-0.5 line-clamp-1',
    classNameValueWrapper,
  );

  return (
    <Tooltip message={label} asProps={{ onClick }}>
      <p className={cnWrapper} style={style?.wrapper}>
        <Icon className="size-3 shrink-0" />

        <span className={cnValueWrapper} style={style?.valueWrapper}>
          {value || t('common.terms.unknown')}
        </span>

        {!!onClick && <ExternalLinkIcon className="size-2 shrink-0" />}
      </p>
    </Tooltip>
  );
};

CompactFootnote.Spacer = function Spacer() {
  return <div className="grow" />;
};
