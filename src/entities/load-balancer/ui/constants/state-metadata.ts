import {
  CheckCircleIcon,
  CircleAlertIcon,
  CircleDashedIcon,
  CircleXIcon,
  ClockIcon,
  HourglassIcon,
  TrashIcon,
} from 'lucide-react';

import type { SchemaLoadBalancerParts as Parts } from '../../rules/schema';
import type { LoadBalancerStatusMetadata as Metadata } from '../../rules/types';

export const LOAD_BALANCER_STATUS_METADATA: Record<
  Parts.State['status'],
  Metadata
> = {
  pending: {
    color: '--color-gray-500',
    icon: HourglassIcon,
    i18n: {
      statusLabel: 'common.terms.pending',
    },
  },
  ready: {
    color: '--color-green-500',
    icon: CheckCircleIcon,
    i18n: {
      statusLabel: 'common.terms.ready',
    },
  },
  progress: {
    color: '--color-cyan-500',
    icon: ClockIcon,
    i18n: {
      statusLabel: 'common.terms.inProgress',
    },
  },
  failed: {
    color: '--color-red-500',
    icon: CircleAlertIcon,
    i18n: {
      statusLabel: 'common.terms.failed',
    },
  },
  deleting: {
    color: '--color-cyan-500',
    icon: TrashIcon,
    i18n: {
      statusLabel: 'common.terms.deleting',
    },
  },
  deleted: {
    color: '--color-orange-500',
    icon: TrashIcon,
    i18n: {
      statusLabel: 'common.terms.deleted',
    },
  },
  cancelled: {
    color: '--color-orange-500',
    icon: CircleXIcon,
    i18n: {
      statusLabel: 'common.terms.cancelled',
    },
  },
  unknown: {
    color: '--color-gray-500',
    icon: CircleDashedIcon,
    i18n: {
      statusLabel: 'common.terms.unknown',
    },
  },
};
