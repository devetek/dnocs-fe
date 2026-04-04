import type { DnsRecord } from '@/entities/domain/rules/schema/parts';
import type { SchemaCommon } from '@/entities/shared/rules/schema';

import { registerEvents } from '@/shared/libs/events';
import type { Rescope } from '@/shared/libs/events/models/registerEvents';

type EventsRegistry = Rescope<
  '#domain-details-sidepanel',
  {
    'details/refresh'?: void;
    'details/next-page'?: void;
    'details/prev-page'?: void;
    'details/to-page': number;
    'dns-record--delete': [domainId: SchemaCommon.UnitId, record: DnsRecord];
  }
>;

export const [useEmit, useSubscribe] = registerEvents<EventsRegistry>();
