import {
  CheckCircleIcon,
  CircleAlertIcon,
  CircleDashedIcon,
  CircleXIcon,
  ClockIcon,
  TrashIcon,
} from 'lucide-react';

import type { SchemaServerParts } from '../../rules/schema';
import type { ServerStateMetadata } from '../../rules/types';

export const SERVER_STATE_METADATA: Record<
  SchemaServerParts.State['status'],
  ServerStateMetadata
> = {
  ready: {
    icon: CheckCircleIcon,
    color: '--color-green-600',
    i18n: {
      statusLabel: 'common.terms.ready',
    },
  },
  progress: {
    icon: ClockIcon,
    color: '--color-cyan-500',
    i18n: {
      statusLabel: 'common.terms.inProgress',
    },
  },
  cancelled: {
    icon: CircleXIcon,
    color: '--color-yellow-500',
    i18n: {
      statusLabel: 'common.terms.cancelled',
    },
  },
  deleting: {
    icon: TrashIcon,
    color: '--color-orange-500',
    i18n: {
      statusLabel: 'common.terms.deleting',
    },
  },
  deleted: {
    icon: TrashIcon,
    color: '--color-yellow-500',
    i18n: {
      statusLabel: 'common.terms.deleted',
    },
  },
  failed: {
    icon: CircleAlertIcon,
    color: '--color-red-500',
    i18n: {
      statusLabel: 'common.terms.failed',
    },
  },
  unknown: {
    icon: CircleDashedIcon,
    color: '--color-gray-500',
    i18n: {
      statusLabel: 'common.terms.unknown',
    },
  },
};
