import { registerEvents } from '@/shared/libs/events';
import type { Rescope } from '@/shared/libs/events/models/registerEvents';

import type { DialogPayload } from '../rules/types';

export type DialogEvents = Rescope<
  '%%dialog',
  {
    open: DialogPayload;
    close: null;
  }
>;

export const [useDialogEmit, useDialogSubscribe] =
  registerEvents<DialogEvents>();
