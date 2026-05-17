import { useDevetekTranslations } from '@/services/i18n';

import { cn } from '@/shared/libs/tailwind/cn';

import { RES_STATE_METADATA, injectDynStyles } from '../constants/config';
import type { ChipProps, IconProps, LabelProps } from './-types';

function Icon(props: IconProps) {
  const { className, colorless, status } = props;

  const { icon: Icon } = RES_STATE_METADATA[status];

  const cnIcon = cn(!colorless && 'text-(--color-hero)', className);

  const style = injectDynStyles(null, status);

  return <Icon className={cnIcon} style={style} />;
}

function Label(props: LabelProps) {
  const { className, as: As = 'p', colorless, status } = props;

  const t = useDevetekTranslations();

  const { i18n } = RES_STATE_METADATA[status];

  const style = injectDynStyles(null, status);

  const cnAs = cn(!colorless && 'text-(--color-hero)', className);

  return (
    <As className={cnAs} style={style}>
      {t(i18n.statusLabel)}
    </As>
  );
}

function Chip(props: ChipProps) {
  const { status, as: As = 'p', className } = props;

  const cnWrapper = cn(
    'px-1 py-0.5 rounded-sm',
    'bg-(--color-bg) *:te  xt-[var(--color-text)]',
    'dark:bg-(--color-bg-dark) dark:*:text-(--color-text-dark)',
    'flex items-center',
    className,
  );

  const style = injectDynStyles(null, status);

  return (
    <As className={cnWrapper} style={style}>
      <Icon status={status} />
      <Label as="span" status={status} />
    </As>
  );
}

export const ResState = {
  Icon,
  Label,
  Chip,
};
