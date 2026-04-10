export type SupportedModule =
  | 'application'
  | 'server'
  | 'load-balancer'
  | 'domain'
  | 'secret-ssh'
  | 'cloud-project';

export interface Module {
  type: SupportedModule;
  moduleId: string;
  moduleName: string;
  moduleTeam?: {
    name: string;
  };
}

// type Mod<M extends string, T> = { type: M } & T;

export interface MigrateOwnershipModalProps {
  mod: Module;
  onSuccess?: () => void;
}
