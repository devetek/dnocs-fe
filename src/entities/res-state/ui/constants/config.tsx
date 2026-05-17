import type { CSSProperties } from 'react';

import {
  CheckIcon,
  CircleHelpIcon,
  CircleXIcon,
  ClockIcon,
  LoaderCircleIcon,
  OctagonAlertIcon,
  Trash2Icon,
} from 'lucide-react';

import { cn } from '@/shared/libs/tailwind/cn';

import type { ResStateStatus } from '../../rules/schema';
import type { ResStateConfig } from '../../rules/types';

export const RES_STATE_METADATA: Record<ResStateStatus, ResStateConfig> = {
  unknown: {
    colorGroup: 'gray',
    icon: CircleHelpIcon,
    i18n: {
      statusLabel: 'common.terms.unknown',
    },
  },
  ready: {
    colorGroup: 'green',
    icon: CheckIcon,
    i18n: {
      statusLabel: 'common.terms.ready',
    },
  },
  progress: {
    colorGroup: 'yellow',
    icon: (iconProps) => (
      <LoaderCircleIcon
        {...iconProps}
        className={cn('animate-spin', iconProps.className)}
      />
    ),
    i18n: {
      statusLabel: 'common.terms.inProgress',
    },
  },
  failed: {
    colorGroup: 'red',
    icon: CircleXIcon,
    i18n: {
      statusLabel: 'common.terms.failed',
    },
  },
  pending: {
    colorGroup: 'yellow',
    icon: ClockIcon,
    i18n: {
      statusLabel: 'common.terms.pending',
    },
  },
  cancelled: {
    colorGroup: 'yellow',
    icon: OctagonAlertIcon,
    i18n: {
      statusLabel: 'common.terms.cancelled',
    },
  },
  deleting: {
    colorGroup: 'yellow',
    icon: Trash2Icon,
    i18n: {
      statusLabel: 'common.terms.deleting',
    },
  },
  deleted: {
    colorGroup: 'gray',
    icon: Trash2Icon,
    i18n: {
      statusLabel: 'common.terms.deleted',
    },
  },
};

export const injectDynStyles = (
  prefix: string | null,
  status: ResStateStatus,
): CSSProperties => {
  const { colorGroup } = RES_STATE_METADATA[status];

  const pre = prefix ? `--color-${prefix}` : `--color`;

  return {
    [`${pre}-hero`]: `var(--color-${colorGroup}-500)`,
    [`${pre}-bg`]: `var(--color-${colorGroup}-100)`,
    [`${pre}-bg-dark`]: `var(--color-${colorGroup}-900)`,
    [`${pre}-text`]: `var(--color-${colorGroup}-700)`,
    [`${pre}-text-dark`]: `var(--color-${colorGroup}-300)`,
  } as CSSProperties;
};
