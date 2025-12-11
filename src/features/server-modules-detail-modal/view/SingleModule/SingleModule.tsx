import { useMemo } from 'react';

import type { PayloadFn } from '@/entities/server-modules/config/installerPayload';
import { PAYLOAD_REGISTRY } from '@/entities/server-modules/config/installerPayload';

import { ApiService } from '@/shared/api';
import { Button } from '@/shared/presentation/atoms/Button';
import { Spinner } from '@/shared/presentation/atoms/Spinner';
import { FailedState } from '@/widgets/failed-state';

import { useBaseContext } from '../../config/base-context';
import useHandleDeleteModule from '../../model/handle-delete-module';
import useHandleInstallModule from '../../model/handle-install-module';

export default function SingleModule() {
  const { moduleInfo, serverID } = useBaseContext();

  const [response, refresh] = ApiService.Find.useGet({
    pageSize: 1,
    serverId: String(serverID),
    moduleName: moduleInfo.id,
    moduleType: moduleInfo.category[0],
    options: {
      skip: !serverID,
    },
  });

  const { installModule } = useHandleInstallModule();
  const { deleteModule } = useHandleDeleteModule(refresh);

  const configuration = useMemo(() => {
    if (!serverID) return null;

    const payloadFn = PAYLOAD_REGISTRY[moduleInfo.id] as PayloadFn | undefined;
    if (payloadFn == null) return null;

    return payloadFn({ serverID, version: '' });
  }, [moduleInfo.id, serverID]);

  const handleClickInstall = () => {
    if (!configuration) return;
    installModule('', configuration);
  };

  if (response.$status === 'failed') {
    return <FailedState.WallCentered />;
  }

  if (response.$status === 'loading') {
    return <Spinner />;
  }

  if (response.$status === 'initial') return null;

  const svcId = response.services?.[0]?.id ?? -1;

  if (svcId === -1)
    return (
      <div className="rounded-xl bg-background w-full flex flex-col">
        <div className="flex items-center justify-between px-3 py-2">
          <div className="flex items-center gap-1">
            <h6 className="cursor-default text-sm font-bold text-primary">
              {moduleInfo.name}
            </h6>
          </div>

          <Button size="xs" variant="outline" onClick={handleClickInstall}>
            Install
          </Button>
        </div>
      </div>
    );

  return (
    <div className="italic text-right">
      <Button
        size="sm"
        variant="outline"
        onClick={() => deleteModule('', svcId)}
      >
        Delete
      </Button>
    </div>
  );
}
