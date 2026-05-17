import { useMemo } from 'react';

import { deepEqual } from 'fast-equals';
import { PlusCircleIcon } from 'lucide-react';

import { useDevetekTranslations } from '@/services/i18n';

import { withErgo } from '@/shared/libs/ergo';
import SpinnerOverlay from '@/shared/presentation/atoms/SpinnerOverlay';
import TabbedCard from '@/shared/presentation/organisms/TabbedCard';

import { buildPaginationV2 } from '@/widgets/ui-atomic-builder/atom-pagination-v2';

import { useEmit } from '../../-models/events';
import { useResourcesModel } from '../../-models/resources';
import { ARTIFACT_STATES, DEPLOYMENT_STATES } from './-States';
import ArtifactCard from './ArtifactCard';
import DeploymentCard from './DeploymentCard';

const Pagination = buildPaginationV2({});

const Artifacts = withErgo(ARTIFACT_STATES)(() => {
  const [list, currentPage, totalPage] = useResourcesModel((s) => [
    s.artifacts.list._,
    s.artifacts.pagination.page._,
    s.artifacts.pagination.total_page._,
  ]);

  const emit = useEmit();

  return (
    <SpinnerOverlay loading={list.stale === 'from-change'}>
      <div className="p-3 flex flex-col gap-y-2">
        {list().map((artifact, index) => {
          return (
            <ArtifactCard
              key={artifact.id}
              data={artifact}
              isLatest={index === 0}
            />
          );
        })}

        {totalPage() > 1 && (
          <div className="flex justify-end">
            <Pagination
              currentPage={currentPage()}
              totalPage={totalPage()}
              onClickBack={emit.intoOnClick(
                '@applications::details/resources/artifact-history--page',
                'prev',
              )}
              onClickForward={emit.intoOnClick(
                '@applications::details/resources/artifact-history--page',
                'next',
              )}
              onPageChange={emit.intoOnChange(
                '@applications::details/resources/artifact-history--page',
              )}
            />
          </div>
        )}
      </div>
    </SpinnerOverlay>
  );
});

const Deployments = withErgo(DEPLOYMENT_STATES)(() => {
  const [appConfigDefs, deploymentList, deploymentPagination] =
    useResourcesModel((s) => [
      s.appDetails.configDefs._,
      s.deployments.list._,
      s.deployments.pagination._,
    ]);

  const emit = useEmit();

  const deployments = deploymentList();
  const configDefsLifecycle = appConfigDefs().lifecycle;

  return (
    <SpinnerOverlay loading={deploymentList.stale === 'from-change'}>
      <div className="p-3 flex flex-col gap-y-2">
        {useMemo(
          () =>
            deployments.map((deployment) => {
              const isStale = !deepEqual(
                deployment.configSnapshot.lifecycle,
                configDefsLifecycle,
              );

              return (
                <DeploymentCard
                  key={deployment.id}
                  data={deployment}
                  isConfigStale={isStale}
                />
              );
            }),
          [configDefsLifecycle, deployments],
        )}

        {deploymentPagination().total_page > 1 && (
          <div className="flex justify-end">
            <Pagination
              currentPage={deploymentPagination().page}
              totalPage={deploymentPagination().total_page}
              onClickBack={emit.intoOnClick(
                '@applications::details/resources/deployment-history--page',
                'prev',
              )}
              onClickForward={emit.intoOnClick(
                '@applications::details/resources/deployment-history--page',
                'next',
              )}
              onPageChange={emit.intoOnChange(
                '@applications::details/resources/deployment-history--page',
              )}
            />
          </div>
        )}
      </div>
    </SpinnerOverlay>
  );
});

export default function CicdHistory() {
  const emit = useEmit();

  const t = useDevetekTranslations();

  return (
    <TabbedCard.WithActions
      actions={[
        {
          label: t('common.actions.new'),
          icon: PlusCircleIcon,
          onClick: emit.intoOnClick(
            '@applications::details/actions/new-artifact',
          ),
        },
      ]}
      items={[
        {
          id: 'deployments',
          label: 'Deployments',
          content: <Deployments />,
        },
        {
          id: 'artifacts',
          label: 'Artifacts',
          content: <Artifacts />,
        },
      ]}
    />
  );
}
