import { useDevetekTranslations } from '@/services/i18n';

import { OS_SERVICE_STATE_METADATA } from '../../constants/state-metadata';

import type {
  ServiceStateBadgeProps as BadgeProps,
  ServiceStateLabelProps as LabelProps,
} from './types';

export function Badge(props: BadgeProps) {
  const { className, colorless, serviceState } = props;

  const { color, icon: Icon } = OS_SERVICE_STATE_METADATA[serviceState];

  return (
    <Icon
      className={className}
      style={{ color: colorless ? 'inherit' : `var(${color})` }}
    />
  );
}

export function Label(props: LabelProps) {
  const { className, as: As = 'p', colorless, serviceState } = props;

  const t = useDevetekTranslations();

  const { color, i18n } = OS_SERVICE_STATE_METADATA[serviceState];

  return (
    <As
      className={className}
      style={{ color: colorless ? 'inherit' : `var(${color})` }}
    >
      {t(i18n.statusLabel)}
    </As>
  );
}

export const ServiceState = {
  Badge,
  Label,
};
