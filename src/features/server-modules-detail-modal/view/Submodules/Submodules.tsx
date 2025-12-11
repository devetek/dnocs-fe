import { groupSubmodulesGetVersions } from '@/entities/server-modules/model/groupBy';

import { ApiService } from '@/shared/api';
import { Spinner } from '@/shared/presentation/atoms/Spinner';
import { FailedState } from '@/widgets/failed-state';

import { useBaseContext } from '../../config/base-context';
import useHandleDeleteModule from '../../model/handle-delete-module';
import { SubmoduleSection } from '../../presentation/SubmoduleSection';

export default function Submodules() {
  const { moduleInfo, serverID } = useBaseContext();

  const [response, refresh] = ApiService.Find.useGet({
    pageSize: 99,
    serverId: String(serverID),
    moduleName: moduleInfo.id,
    moduleType: moduleInfo.category[0],
    options: {
      skip: !serverID,
    },
  });

  const { deleteModule } = useHandleDeleteModule(refresh);

  if (response.$status === 'failed') {
    return <FailedState.WallCentered />;
  }

  if (response.$status === 'loading') {
    return <Spinner />;
  }

  if (response.$status === 'initial') return null;

  const submodules = groupSubmodulesGetVersions(response.services);

  const renderedSubmodules = moduleInfo.has_submodule
    ? submodules.map((submodule, index) => {
        const { id, version, inProgress, attributes } = submodule;

        return (
          <SubmoduleSection
            key={index}
            submoduleVersion={version}
            submoduleSummaries={attributes}
            inProgress={inProgress}
            onClickDelete={() => deleteModule(version, id)}
          />
        );
      })
    : [];

  return (
    <div className="flex flex-col gap-1">
      {moduleInfo.has_submodule && (
        <>
          <h6 className="font-bold text-xs">Submodules</h6>
          <div className="flex flex-col gap-2">
            {renderedSubmodules.length > 0 ? (
              renderedSubmodules
            ) : (
              <p className="text-sm italic">No submodules found.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}
