import type { ChangeEvent } from 'react';
import { useMemo, useState } from 'react';

import type { PayloadFn } from '@/entities/server-modules/config/installerPayload';
import { PAYLOAD_REGISTRY } from '@/entities/server-modules/config/installerPayload';

import { Button } from '@/shared/presentation/atoms/Button';
import { ErrorInline } from '@/shared/presentation/atoms/ErrorInline';
import { Input } from '@/shared/presentation/atoms/Input';

import { REGEX_SEMVER } from '../../config';
import { useBaseContext } from '../../config/base-context';
import useHandleInstallModule from '../../model/handle-install-module';
import { SingleModule } from '../SingleModule';

export default function Installation() {
  const { moduleInfo, serverID } = useBaseContext();

  const [version, setVersion] = useState('');

  const isVersionValidSemver = REGEX_SEMVER.test(version);

  const { installModule } = useHandleInstallModule();

  const configuration = useMemo(() => {
    if (!serverID) return null;

    const payloadFn = PAYLOAD_REGISTRY[moduleInfo.id] as PayloadFn | undefined;
    if (payloadFn == null) return null;

    return payloadFn({ serverID, version });
  }, [version, moduleInfo.id, serverID]);

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
    installModule(version, configuration);
  };

  const handleChangeVersion = (e: ChangeEvent<HTMLInputElement>) => {
    setVersion(e.target.value);
  };

  if (!configuration || !renderedJSON) {
    return (
      <p className="text-sm italic">
        No module configuration found for this module.
      </p>
    );
  }

  if (!moduleInfo.has_submodule) {
    return <SingleModule />;
  }

  return (
    <div className="rounded-xl bg-background w-full flex flex-col">
      <div className="flex items-center justify-between px-3 py-2">
        <div className="flex items-center gap-1">
          <h6 className="cursor-default text-sm font-bold text-primary">
            Install new submodule
          </h6>
        </div>

        <Button size="xs" variant="outline" onClick={handleClickInstall}>
          Install
        </Button>
      </div>

      <div className="flex flex-col border-t">
        <div className="p-2 flex flex-col w-1/2 gap-1">
          <h6 className="text-sm font-bold opacity-70">Version</h6>
          <Input value={version} onChange={handleChangeVersion} />
          {!isVersionValidSemver && (
            <ErrorInline message="Version must be a valid semver!" />
          )}
        </div>

        {isVersionValidSemver && (
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
        )}
      </div>
    </div>
  );
}
