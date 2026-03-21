import { useMemo } from 'react';

import type { PayloadFn } from '@/entities/server-modules/config/installerPayload';
import { PAYLOAD_REGISTRY } from '@/entities/server-modules/config/installerPayload';

import { ApiService } from '@/shared/api';
import { Button } from '@/shared/presentation/atoms/Button';
import { ErrorInline } from '@/shared/presentation/atoms/ErrorInline';
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

  const renderedJSON = useMemo(() => {
    if (!configuration) return null;

    try {
      return {
        status: 'success' as const,
        rendered: JSON.stringify(configuration, null, 2),
      };
    } catch (error) {
      return {
        status: 'error' as const,
        error: `[Parse Error] ${
          error instanceof Error ? error.message : error
        }`,
      };
    }
  }, [configuration]);

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

  if (!configuration || !renderedJSON) {
    return (
      <p className="text-sm italic">
        No module configuration found for this module.
      </p>
    );
  }

  if (svcId === -1) {
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

        <div className="flex flex-col border-t">
          <div className="overflow-hidden p-2">
            <>
              <h6 className="text-sm font-bold opacity-70 mb-1">
                Rendered Configuration JSON
              </h6>
              {renderedJSON.status === 'success' ? (
                <div className="border bg-card rounded-lg">
                  <pre className="text-xs overflow-auto p-2 whitespace-pre-wrap">
                    {renderedJSON.rendered}
                  </pre>
                </div>
              ) : (
                <ErrorInline className="mt-2" message={renderedJSON.error} />
              )}
            </>
          </div>
        </div>
      </div>
    );
  }

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
