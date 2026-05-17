import { useDevetekTranslations } from '@/services/i18n';

import { cn } from '@/shared/libs/tailwind/cn';

import {
  OS_SERVICE_STATE_METADATA,
  injectDynStyles,
} from '../../constants/state-metadata';
import type {
  ServiceStateBadgeProps as BadgeProps,
  ServiceStateChipProps as ChipProps,
  ServiceStateLabelProps as LabelProps,
} from './types';

function Badge(props: BadgeProps) {
  const { className, colorless, serviceState } = props;

  const { icon: Icon } = OS_SERVICE_STATE_METADATA[serviceState];

  const cnIcon = cn(!colorless && 'text-(--color-hero)', className);

  const style = injectDynStyles(null, serviceState);

  return <Icon className={cnIcon} style={style} />;
}

function Label(props: LabelProps) {
  const { className, as: As = 'p', colorless, serviceState } = props;

  const t = useDevetekTranslations();

  const { i18n } = OS_SERVICE_STATE_METADATA[serviceState];

  const style = injectDynStyles(null, serviceState);

  const cnAs = cn(!colorless && 'text-(--color-hero)', className);

  return (
    <As className={cnAs} style={style}>
      {t(i18n.statusLabel)}
    </As>
  );
}

function Chip(props: ChipProps) {
  const { serviceState, as: As = 'p', className } = props;

  const cnWrapper = cn(
    'px-1 py-0.5 rounded-sm',
    'bg-(--color-bg) *:te  xt-[var(--color-text)]',
    'dark:bg-(--color-bg-dark) dark:*:text-(--color-text-dark)',
    'flex items-center',
    className,
  );

  const style = injectDynStyles(null, serviceState);

  return (
    <As className={cnWrapper} style={style}>
      <Badge serviceState={serviceState} />
      <Label as="span" serviceState={serviceState} />
    </As>
  );
}

export const ServiceState = {
  Badge,
  Label,
  Chip,
};
