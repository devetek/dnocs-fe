import type { ServerCard } from '@/entities/server/rules/schema';

import { registerEvents } from '@/shared/libs/events';
import type { Rescope } from '@/shared/libs/events/models/registerEvents';

import type {
  MachineDeletePayload,
  MachineReinstallPayload,
  ServerClaimToOrgPayload,
} from '../-usecase/types';

type EventsRegistry = Rescope<
  '@resources::servers',
  {
    'machine-delete': MachineDeletePayload;
    'machine-reinstall': MachineReinstallPayload;
    'servers-refresh': null;
    'server-claim-to-org': ServerClaimToOrgPayload;
    'server-status-info-dialog': ServerCard;
    'server-edit-sidepanel': ServerCard;
  }
>;

export const [useEmit, useSubscribe] = registerEvents<EventsRegistry>();
