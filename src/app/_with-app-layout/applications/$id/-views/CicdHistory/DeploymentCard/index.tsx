import {
  AmphoraIcon,
  BoltIcon,
  CalendarIcon,
  CircleFadingArrowUpIcon,
  CogIcon,
  EthernetPortIcon,
  GitCommitVerticalIcon,
  InfoIcon,
  RotateCwIcon,
  ServerIcon,
  SettingsIcon,
  SquareIcon,
  TrashIcon,
  TriangleAlertIcon,
  UserCogIcon,
} from 'lucide-react';

import { useDevetekLocale } from '@/services/i18n';

import { ServiceState } from '@/entities/os-service/ui/presentation/ServiceState';
import { ResState } from '@/entities/res-state/ui/presentation';
import '@/shared/libs/browser/string';

import usePushServiceActivityUsecase from '@/entities/os-service/usecase/push-activity';

import {
  getDistanceFromNow,
  humanizeSeconds,
} from '@/shared/libs/browser/date';
import { f } from '@/shared/libs/browser/fn';
import { excludeFalsy } from '@/shared/libs/browser/typeguards';
import { Tooltip } from '@/shared/presentation/atoms/Tooltip';

import { useEmit } from '../../../-models/events';
import useSeeFullStateMessage from '../../../-usecases/use-see-full-state-message';
import { CicdCard } from '../../-presentations';
import type { CicdCardTypes } from '../../-presentations/CicdCard';
import {
  CommandInfo,
  CommitInfo,
  TechnicalSpecs,
  TraceMessage,
} from '../-presentations';
import type { Props } from './-types';

export default function DeploymentCard(props: Props) {
  const { data, isConfigStale } = props;
  const artifact = data.deploymentMetadata.artifact;

  const locale = useDevetekLocale();

  const emit = useEmit();
  const { handleSeeFulLStateMessage } = useSeeFullStateMessage();
  const [handlePushServiceActivity] = usePushServiceActivityUsecase({
    onSuccess: emit.intoOnClick(
      '@applications::details/resources/deployment-history--refresh',
    ),
  });

  const handleViewFullStateMessage = () => {
    handleSeeFulLStateMessage(data.state);
  };

  const footerAttributes: CicdCardTypes.Attribute[] = [
    {
      id: 'executor-username',
      icon: UserCogIcon,
      label: data.executor.userName,
      tooltipMessage: 'Executor Username',
    },
    {
      id: 'timestamp-updated',
      icon: CalendarIcon,
      label: `${getDistanceFromNow(data.timestamp.updated, locale)} (${humanizeSeconds(data.timestamp.buildTimeInSeconds)})`,
      tooltipMessage: 'Last updated',
    },
  ].filter(excludeFalsy);

  const actions: CicdCardTypes.Action[] = f(() => {
    const collected: CicdCardTypes.Action[] = [];

    if (data.deploymentMetadata.osService != null) {
      const { serviceName, serviceState } = data.deploymentMetadata.osService;

      if (serviceState === 'dead' || serviceState === 'exited') {
        collected.push({
          id: 'start',
          icon: RotateCwIcon,
          label: 'Start',
          onClick: async () => {
            handlePushServiceActivity({
              activity: 'start',
              serviceName: serviceName,
              targetServerId: data.deploymentMetadata.server.id,
            });
          },
        });
      } else if (
        serviceState !== 'restarting' &&
        serviceState !== 'reloading'
      ) {
        collected.push({
          id: 'restart',
          icon: RotateCwIcon,
          label: 'Restart',
          onClick: async () => {
            handlePushServiceActivity({
              activity: 'restart',
              serviceName: serviceName,
              targetServerId: data.deploymentMetadata.server.id,
            });
          },
        });
      }
      if (serviceState !== 'dead' && serviceState !== 'exited') {
        collected.push({
          id: 'stop',
          color: 'danger',
          icon: SquareIcon,
          label: 'Stop',
          onClick: async () => {
            handlePushServiceActivity({
              activity: 'stop',
              serviceName: serviceName,
              targetServerId: data.deploymentMetadata.server.id,
            });
          },
        });
      }
    }

    return [
      ...collected,
      {
        id: 'redeploy',
        icon: CircleFadingArrowUpIcon,
        label: 'Redeploy',
      },
      {
        icon: CogIcon,
        id: 'details',
        label: 'Details',
      },
      {
        id: 'delete',
        color: 'danger',
        icon: TrashIcon,
        label: 'Delete',
      },
    ];
  });

  return (
    <CicdCard
      cardBadge={{
        id: 'badge',
        label: data.deploymentMetadata.server.hostname,
        icon: ServerIcon,
      }}
      headerAttributes={[
        {
          id: 'build-id',
          icon: BoltIcon,
          label: `Build № ${data.id}`,
        },
        {
          id: 'artifact-id',
          icon: AmphoraIcon,
          label: `Artifact № ${artifact.id}`,
        },
        {
          id: 'git-info',
          icon: GitCommitVerticalIcon,
          label: (
            <>
              <span className="font-roboto-mono font-medium">
                {artifact.commitMetadata.head.slice(0, 7)}
              </span>
              ·
              <span className="font-roboto-mono font-medium">
                {artifact.commitMetadata.fromBranch}
              </span>
            </>
          ),
        },
        isConfigStale && {
          id: 'stale-info',
          color: 'severe' as const,
          frame: 'solid' as const,
          icon: TriangleAlertIcon,
          label: 'Outdated',
        },
      ].filter(excludeFalsy)}
      aside={<CicdCard.Actions actions={actions} />}
    >
      <div className="size-full grid grid-cols-[minmax(0,1.5fr)_minmax(0,2fr)]">
        <div className="shrink-0 size-full flex flex-col justify-between">
          <CommitInfo
            metadata={artifact.commitMetadata}
            suffix={
              <>
                {data.state.status !== 'ready' && (
                  <>
                    &nbsp;
                    <ResState.Chip
                      as="span"
                      className="inline-flex *:font-normal *:text-xs [&>svg]:size-3 gap-x-0.5"
                      status={data.state.status}
                    />
                  </>
                )}
                {data.deploymentMetadata.osService && (
                  <>
                    &nbsp;
                    <ServiceState.Chip
                      as="span"
                      className="inline-flex *:font-normal *:text-xs [&>svg]:size-3 gap-x-0.5"
                      serviceState={
                        data.deploymentMetadata.osService.serviceState
                      }
                    />
                  </>
                )}
              </>
            }
          />

          <CicdCard.Footer
            className="flex-col items-start"
            attributes={footerAttributes}
          />
        </div>

        <TechnicalSpecs>
          <div className="grid grid-cols-[2fr_1.5fr] gap-x-4">
            <TechnicalSpecs.Item
              icon={SettingsIcon}
              label="Service"
              value={data.configSnapshot.lifecycle.run.name}
            >
              {data.deploymentMetadata.osService && (
                <Tooltip
                  message={
                    <span className="flex flex-col gap-y-1 max-w-60 overflow-hidden text-center leading-4">
                      Running as
                      <br />
                      <span className="font-roboto-mono font-semibold text-sm">
                        {data.deploymentMetadata.osService.serviceName}
                      </span>
                    </span>
                  }
                >
                  <InfoIcon className="size-3" />
                </Tooltip>
              )}
            </TechnicalSpecs.Item>

            <TechnicalSpecs.Item
              icon={EthernetPortIcon}
              label="Port"
              value={data.configSnapshot.lifecycle.run.port}
            />
          </div>

          {data.state.message && (
            <TraceMessage
              className="mt-3"
              status={data.state.status}
              message={data.state.message}
              onSeeMore={handleViewFullStateMessage}
            />
          )}

          <div className="grow shrink-0 min-h-3" />

          <CommandInfo
            command={data.configSnapshot.lifecycle.run.command}
            envCount={
              data.configSnapshot.lifecycle.build.envs.length +
              data.configSnapshot.lifecycle.run.envs.length
            }
          />
        </TechnicalSpecs>
      </div>
    </CicdCard>
  );
}
