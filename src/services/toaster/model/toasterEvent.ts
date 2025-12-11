import { registerEvents } from '@/shared/libs/events';
import type { Rescope } from '@/shared/libs/events/models/registerEvents';

import type { ToasterItem } from '../rules/types';

export type ToasterEvents = Rescope<
  '%%toaster',
  {
    push: ToasterItem;
    'clear-all': null;
  }
>;

export const [useToasterEmit, useToasterSubscribe] =
  registerEvents<ToasterEvents>();
