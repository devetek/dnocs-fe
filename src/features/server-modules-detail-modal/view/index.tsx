import { ModalLayoutGeneral } from '@/services/modal/ui/presentation';

import { BaseContext } from '../config/base-context';
import { ModuleHero } from '../presentation/ModuleHero';

import { Installation } from './Installation';
import { Submodules } from './Submodules';
import type { ServerModulesDetailModalProps as Props } from './types';

export default function ServerModulesDetailModal(props: Props) {
  const { moduleInfo } = props;

  return (
    <BaseContext value={props}>
      <ModalLayoutGeneral maxWidth="700px">
        <ModalLayoutGeneral.Title canClickClose title="Modules Detail" />

        <ModalLayoutGeneral.Content className="flex flex-col gap-6">
          <ModuleHero
            moduleDescription={moduleInfo.description}
            moduleIcon={moduleInfo.logoUrl}
            moduleName={moduleInfo.name}
          />

          <Installation />

          <Submodules />
        </ModalLayoutGeneral.Content>
      </ModalLayoutGeneral>
    </BaseContext>
  );
}
