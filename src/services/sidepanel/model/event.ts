import { registerEvents } from '@/shared/libs/events';
import type { Rescope } from '@/shared/libs/events/models/registerEvents';

import type { SidepanelPayload } from '../rules/types';

export type SidepanelEvents = Rescope<
  '%%sidepanel',
  {
    open: SidepanelPayload;
    push: SidepanelPayload;
    pop: null;
    close: null;
    'allow-trivial-close': boolean;
  }
>;

export const [useSidepanelEmit, useSidepanelSubscribe] =
  registerEvents<SidepanelEvents>();
