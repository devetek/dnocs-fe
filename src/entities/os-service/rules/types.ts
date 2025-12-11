import type { ReactNode } from 'react';

import type { LucideProps } from 'lucide-react';

import type { SchemaCommon } from '@/entities/shared/rules/schema';

import type { SchemaOsServiceParts } from './schema';

export interface PushActivityPayload {
  serviceName: string;
  targetServerId: SchemaCommon.UnitId;
  activity: SchemaOsServiceParts.Activity;
}

export interface ServiceStateMetadata {
  color: string;
  icon: (props: LucideProps) => ReactNode;
  i18n: {
    statusLabel: string;
  };
}
