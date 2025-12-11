import {
  CheckCircleIcon,
  CircleAlertIcon,
  CircleDashedIcon,
  CircleXIcon,
  ClockIcon,
  TrashIcon,
} from 'lucide-react';

import type { SchemaCicdArtifactParts as Parts } from '../../rules/schema';
import type { CicdArtifactStatusMetadata as Metadata } from '../../rules/types';

export const CICD_ARTIFACT_STATUS_METADATA: Record<
  Parts.State['status'],
  Metadata
> = {
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
