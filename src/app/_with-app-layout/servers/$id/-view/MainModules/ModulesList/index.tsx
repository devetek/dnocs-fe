import { SERVER_MODULES_CATEGORY } from '@/entities/server-modules/config/registry';
import { getModuleInfoByFind } from '@/entities/server-modules/model/getModuleInfo';
import type { ServerModule } from '@/entities/server-modules/model/types';

import { useServerModulesDetailModal } from '@/features/server-modules-detail-modal';

import { excludeNully } from '@/shared/libs/browser/typeguards';
import { Chip } from '@/shared/presentation/atoms/Chip';

import { useServerDataModel } from '../../../-model/server-data';

import type { ModulesListProps } from './types';

export default function ModulesList(props: ModulesListProps) {
  const { modules } = props;

  const [serverId] = useServerDataModel((s) => [s.serverId]);

  const [openServerModulesDetailModal] = useServerModulesDetailModal();

  const handleClickModule = (moduleInfo: ServerModule) => {
    return () => {
      openServerModulesDetailModal({
        moduleInfo,
        serverID: Number(serverId),
      });
    };
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      {SERVER_MODULES_CATEGORY.map((category) => {
        const { id: categoryID, name: categoryName } = category;

        const identifiedModules = modules
          .filter((mod) => {
            const [, , modCategoryID] = mod;

            return modCategoryID === categoryID;
          })
          .map((moduleIdents) => {
            const [id, name, miCategory] = moduleIdents;
            const filtered = getModuleInfoByFind({
              category: miCategory,
              id: name,
            });

            if (filtered) {
              filtered.moduleID = id;
            }

            return filtered;
          })
          .filter(excludeNully);

        if (identifiedModules.length < 1) return null;

        return (
          <div key={categoryID} className="flex flex-col gap-1">
            <h6 className="text-xs font-semibold">{categoryName}</h6>

            <div className="flex items-center gap-1 flex-wrap">
              {identifiedModules.map((mod) => {
                const { id, logoUrl, name } = mod;

                return (
                  <Chip
                    key={id}
                    label={name}
                    logoUrl={logoUrl}
                    onClick={handleClickModule(mod)}
                  />
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
