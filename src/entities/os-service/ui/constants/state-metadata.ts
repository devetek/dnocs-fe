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
  color: '--color-yellow-500',
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
    color: '--color-green-500',
    icon: CirclePlayIcon,
    i18n: {
      statusLabel: 'common.terms.running',
    },
  },
  dead: {
    color: '--color-gray-500',
    icon: SkullIcon,
    i18n: {
      statusLabel: 'common.terms.dead',
    },
  },
  failed: {
    color: '--color-red-500',
    icon: CircleXIcon,
    i18n: {
      statusLabel: 'common.terms.failed',
    },
  },
  exited: {
    color: '--color-red-500',
    icon: LogOutIcon,
    i18n: {
      statusLabel: 'common.terms.exited',
    },
  },
  reload: RESTARTING,
  reloading: RESTARTING,
  restarting: RESTARTING,
  unknown: {
    color: '--color-gray-500',
    icon: CircleHelpIcon,
    i18n: {
      statusLabel: 'common.terms.unknown',
    },
  },
};
