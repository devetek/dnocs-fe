import { registerEvents } from '@/shared/libs/events';
import type { Rescope } from '@/shared/libs/events/models/registerEvents';

import type { ModalPayload } from '../rules/types';

export type ModalEvents = Rescope<
  '%%modal',
  {
    open: ModalPayload;
    close: null;
    'allow-trivial-close': boolean;
  }
>;

export const [useModalEmit, useModalSubscribe] = registerEvents<ModalEvents>();
