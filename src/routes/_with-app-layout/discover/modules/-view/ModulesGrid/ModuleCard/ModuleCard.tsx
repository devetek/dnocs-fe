'use client';

import { groupSubmodulesGetVersions } from '@/entities/server-modules/model/groupBy';
import type { ServerModule } from '@/entities/server-modules/model/types';

import { useServerModulesDetailModal } from '@/features/server-modules-detail-modal';

import { ApiService } from '@/shared/api';
import { iife } from '@/shared/libs/browser/iife';
import { Button } from '@/shared/presentation/atoms/Button';
import { Card } from '@/shared/presentation/atoms/Card';

import { useServerDetailContext } from '../../../-model/server-detail';

import { InstalledVersions } from './_presentation/InstalledVersions';
import { ModuleHero } from './_presentation/ModuleHero';

export default function ModuleCard(props: Props) {
  const { moduleInfo } = props;

  const { serverDetail } = useServerDetailContext();
  const { id: serverId } =
    serverDetail.$status === 'success' ? serverDetail : {};

  const [openServerModulesDetailModal] = useServerModulesDetailModal();

  const handleClickMoreDetail = (moduleID: number) => {
    openServerModulesDetailModal({
      moduleInfo: {
        ...moduleInfo,
        moduleID: moduleID !== -1 ? moduleID : moduleInfo.moduleID,
      },
      serverID: serverId ? Number(serverId) : undefined,
    });
  };

  const [responseService] = ApiService.Find.useGet({
    pageSize: 99,
    serverId,
    moduleName: moduleInfo.id,
    moduleType: moduleInfo.category[0],
    options: {
      skip: !serverId,
    },
  });

  const installedModuleID = iife(() => {
    return responseService.$status === 'success' &&
      Number(responseService.services?.length) > 0
      ? (responseService.services?.[0]?.id ?? -1)
      : -1;
  });

  const versions =
    responseService.$status === 'success'
      ? groupSubmodulesGetVersions(responseService.services)
      : [];

  return (
    <Card className="shadow-none rounded-xl p-3 flex flex-col justify-between h-full">
      <div className="w-full">
        <ModuleHero
          moduleName={moduleInfo.name}
          moduleDescription={moduleInfo.description}
          moduleIcon={moduleInfo.logoUrl}
          isInstalled={
            responseService.$status === 'success' &&
            Number(responseService.services?.length) > 0
          }
        />

        {versions.length > 0 && <InstalledVersions versions={versions} />}
      </div>

      <div className="w-full">
        <Button
          className="w-full"
          variant="secondary"
          size="sm"
          onClick={() => handleClickMoreDetail(installedModuleID)}
        >
          More Detail
        </Button>
      </div>
    </Card>
  );
}

interface Props {
  moduleInfo: ServerModule;
}
