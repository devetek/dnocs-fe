import type { ServerModule } from '@/entities/server-modules/model/types';

export interface ServerModulesDetailModalProps {
  serverID?: number;
  moduleInfo: ServerModule;
}
