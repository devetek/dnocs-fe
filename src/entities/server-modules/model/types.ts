export type ServerModuleCategoryTag =
  | 'language'
  | 'database'
  | 'container'
  | 'utilities'
  | 'infrastructure';
export type ServerModulePlatformTag = 'vm';

export interface ServerModule {
  category: ServerModuleCategoryTag[];
  platform: ServerModulePlatformTag[];

  id: string;
  moduleID?: number;
  name: string;
  description: string;
  logoUrl: string;
  has_submodule: boolean;
}

export interface ServerModuleCategory {
  id: ServerModuleCategoryTag;
  name: string;
}

export interface ServerModulePlatform {
  id: ServerModulePlatformTag;
  name: string;
}
