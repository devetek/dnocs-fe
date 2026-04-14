import {
  HARDCODED_SERVER_MODULES,
  SERVER_MODULES_CATEGORY,
} from '@/entities/server-modules/config/registry';

import { ModulesGridLayout } from './_presentation/Layout';
import { ModuleCard } from './ModuleCard';

export default function ModulesGrid() {
  return (
    <div className="flex flex-col gap-6">
      {SERVER_MODULES_CATEGORY.map((modCategory) => {
        const { id, name } = modCategory;

        return (
          <div key={id}>
            <h3 className="text-lg font-bold text-primary mb-2">{name}</h3>
            <ModulesGridLayout>
              {HARDCODED_SERVER_MODULES.filter((mod) =>
                mod.category.includes(id),
              ).map((mod, index) => {
                return (
                  <ModulesGridLayout.Item key={index}>
                    <ModuleCard moduleInfo={mod} />
                  </ModulesGridLayout.Item>
                );
              })}
            </ModulesGridLayout>
          </div>
        );
      })}
    </div>
  );
}
