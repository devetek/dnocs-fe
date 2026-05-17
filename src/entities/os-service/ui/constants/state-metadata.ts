import type { CSSProperties } from 'react';

import {
  CircleArrowUpIcon,
  CircleHelpIcon,
  CirclePlayIcon,
  CircleXIcon,
  LogOutIcon,
  SkullIcon,
} from 'lucide-react';

import type { SchemaOsServiceParts } from '../../rules/schema';
import type { ServiceStateMetadata } from '../../rules/types';

const RESTARTING: ServiceStateMetadata = {
  colorGroup: 'yellow',
  icon: CircleArrowUpIcon,
  i18n: {
    statusLabel: 'common.terms.restarting',
  },
};

export const OS_SERVICE_STATE_METADATA: Record<
  SchemaOsServiceParts.State,
  ServiceStateMetadata
> = {
  running: {
    colorGroup: 'green',
    icon: CirclePlayIcon,
    i18n: {
      statusLabel: 'common.terms.running',
    },
  },
  dead: {
    colorGroup: 'gray',
    icon: SkullIcon,
    i18n: {
      statusLabel: 'common.terms.dead',
    },
  },
  failed: {
    colorGroup: 'red',
    icon: CircleXIcon,
    i18n: {
      statusLabel: 'common.terms.failed',
    },
  },
  exited: {
    colorGroup: 'red',
    icon: LogOutIcon,
    i18n: {
      statusLabel: 'common.terms.exited',
    },
  },
  reload: RESTARTING,
  reloading: RESTARTING,
  restarting: RESTARTING,
  unknown: {
    colorGroup: 'gray',
    icon: CircleHelpIcon,
    i18n: {
      statusLabel: 'common.terms.unknown',
    },
  },
};

export const injectDynStyles = (
  prefix: string | null,
  state: SchemaOsServiceParts.State,
): CSSProperties => {
  const { colorGroup } = OS_SERVICE_STATE_METADATA[state];

  const pre = prefix ? `--color-${prefix}` : `--color`;

  return {
    [`${pre}-hero`]: `var(--color-${colorGroup}-500)`,
    [`${pre}-bg`]: `var(--color-${colorGroup}-100)`,
    [`${pre}-bg-dark`]: `var(--color-${colorGroup}-900)`,
    [`${pre}-text`]: `var(--color-${colorGroup}-700)`,
    [`${pre}-text-dark`]: `var(--color-${colorGroup}-300)`,
  } as CSSProperties;
};
