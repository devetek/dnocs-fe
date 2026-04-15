import {
  AppWindowIcon,
  BoltIcon,
  Calendar,
  CheckIcon,
  ClockIcon,
  CodeIcon,
  GitBranchIcon,
  HammerIcon,
  HashIcon,
  LoaderCircle,
  OctagonAlertIcon,
  PlayIcon,
  RotateCcwIcon,
  ServerIcon,
  SquareIcon,
  Trash2Icon,
  UndoIcon,
  UserCogIcon,
  XIcon,
} from 'lucide-react';

import { useRouter } from '@tanstack/react-router';

import { useDevetekLocale } from '@/services/i18n';

import type { CicdArtifact } from '@/entities/cicd-artifact/rules/schema';
import type { CicdDeployment } from '@/entities/cicd-deployment/rules/schema';

import {
  getDistanceFromNow,
  humanizeSeconds,
} from '@/shared/libs/browser/date';
import { cn } from '@/shared/libs/tailwind/cn';
import { Card } from '@/shared/presentation/atoms/Card';
import Shimmer from '@/shared/presentation/atoms/Shimmer';

import usePushServiceActivityUsecase from '@/entities/os-service/usecase/push-activity';
import { ServiceState } from '@/entities/os-service/ui/presentation/ServiceState';

import { Button } from '@/shared/presentation/atoms/Button';

import { useEmit } from '../../-model/events';
import { ArtifactCardPartials as Partials } from './_presentation/ArtifactCard/_Partials';

type DeployStatus = CicdDeployment['state']['status'];

function DeploymentStatusBadge({ status }: { status: DeployStatus }) {
  if (status === 'ready') {
    return (
      <span className="inline-flex items-center gap-1 rounded-tr-[7px] rounded-bl-md pl-1.5 pr-3 py-1 text-xs font-semibold bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
        <CheckIcon className="size-3" />
        Ready
      </span>
    );
  }

  if (status === 'failed') {
    return (
      <span className="inline-flex items-center gap-1 rounded-tr-[7px] rounded-bl-md pl-1.5 pr-3 py-1 text-xs font-semibold bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200">
        <XIcon className="size-3" />
        Failed
      </span>
    );
  }

  if (status === 'progress') {
    return (
      <span className="inline-flex items-center gap-1 rounded-tr-[7px] rounded-bl-md pl-1.5 pr-3 py-1 text-xs font-semibold bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200">
        <LoaderCircle className="size-3 animate-spin" />
        In Progress
      </span>
    );
  }

  if (status === 'cancelled') {
    return (
      <span className="inline-flex items-center gap-1 rounded-tr-[7px] rounded-bl-md pl-1.5 pr-3 py-1 text-xs font-semibold bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200">
        <OctagonAlertIcon className="size-3" />
        Cancelled
      </span>
    );
  }

  if (status === 'pending') {
    return (
      <span className="inline-flex items-center gap-1 rounded-tr-[7px] rounded-bl-md pl-1.5 pr-3 py-1 text-xs font-semibold bg-muted text-muted-foreground">
        <LoaderCircle className="size-3" />
        Pending
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 rounded-tr-[7px] rounded-bl-md pl-1.5 pr-3 py-1 text-xs font-semibold bg-muted text-muted-foreground capitalize">
      {status}
    </span>
  );
}

interface DeploymentCardProps {
  data: CicdDeployment;
  artifact: CicdArtifact | undefined;
  onClickActivity: (activity: 'start' | 'stop' | 'restart') => void;
  onClickDelete: () => void;
  onClickRestore: () => void;
}

function DeploymentCard({ data, artifact, onClickActivity, onClickDelete, onClickRestore }: DeploymentCardProps) {
  const locale = useDevetekLocale();
  const updatedAt = getDistanceFromNow(data.timestamp.updated, locale);
  const router = useRouter();
  const serverHref = router.buildLocation({ to: '/servers/$id', params: { id: data.serverSnapshot.id } }).href;

  const cnCard = cn('shadow-none rounded-lg', {
    'border-green-600/40': data.state.status === 'ready',
    'border-red-600/40': data.state.status === 'failed',
    'border-yellow-600/40':
      data.state.status === 'progress' || data.state.status === 'cancelled',
  });

  return (
    <Card className={cnCard}>
      {/* Header row — IDs + status badge */}
      <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,auto)] gap-x-2">
        <div className="pl-1 flex items-center gap-1 overflow-x-auto">
          <Partials.HeadingItemWrapper tooltipMessage="Deploy ID">
            <BoltIcon className="size-3" />
            {data.id}
          </Partials.HeadingItemWrapper>

          {artifact && (
            <>
              <Partials.HeadingItemWrapper
                tooltipMessage={`Commit ${artifact.commitMetadata.head}`}
              >
                <HashIcon className="size-3" />
                {artifact.commitMetadata.head.slice(0, 7)}
              </Partials.HeadingItemWrapper>

              <Partials.HeadingItemWrapper tooltipMessage="Target Branch">
                <GitBranchIcon className="size-3" />
                {artifact.commitMetadata.fromBranch}
              </Partials.HeadingItemWrapper>

              <Partials.HeadingItemWrapper tooltipMessage="Build Time">
                <ClockIcon className="size-3" />
                {humanizeSeconds(artifact.timestamp.buildTimeInSeconds)}
              </Partials.HeadingItemWrapper>
            </>
          )}
        </div>

        <div className="flex items-center">
          <DeploymentStatusBadge status={data.state.status} />
        </div>
      </div>

      {/* Body */}
      <div className="bg-card rounded-[7px] p-3 pt-2 flex flex-col gap-2">
        {artifact ? (
          <div className="flex flex-col">
            <h5 className="text-sm md:text-lg font-bold">
              {artifact.commitMetadata.title}
            </h5>
            <p className="text-xs md:text-sm line-clamp-1">
              {artifact.commitMetadata.description || (
                <em className="opacity-50">No description available</em>
              )}
            </p>
          </div>
        ) : (
          <p className="text-xs text-muted-foreground italic">Artifact not found</p>
        )}

        <div className="flex items-center flex-wrap gap-x-4 gap-y-1">
          <a
            href={serverHref}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-primary/70 flex items-center gap-0.5 hover:underline"
          >
            <ServerIcon className="size-3" />
            {data.serverSnapshot.hostName}
          </a>

          {data.osService && (
            <p className="text-xs text-primary/70 flex items-center gap-0.5">
              <AppWindowIcon className="size-3" />
              {data.osService.serviceName}
              <ServiceState.Badge
                className="size-3 ml-0.5"
                serviceState={data.osService.serviceState}
              />
              <ServiceState.Label
                as="span"
                className="text-xs"
                serviceState={data.osService.serviceState}
              />
            </p>
          )}

          {artifact && (
            <p className="text-xs text-primary/70 flex items-center gap-0.5">
              <UserCogIcon className="size-3" />
              {artifact.executor.userName}
            </p>
          )}

          <p className="text-xs text-primary/70 flex items-center gap-0.5">
            <Calendar className="size-3" />
            {updatedAt}
          </p>
        </div>

        {/* ── Artifact Snapshot ── */}
        {artifact && (
          <div className="flex items-center flex-wrap gap-x-3 gap-y-1 pt-2 border-t border-border/50">
            <p className="text-xs text-primary/70 flex items-center gap-0.5 font-mono">
              <BoltIcon className="size-3 shrink-0" />
              artifact/{artifact.id}
            </p>

            {artifact.configSnapshot.lifecycle.setup.languages.length > 0 && (
              <div className="flex items-center gap-1">
                <CodeIcon className="size-3 text-muted-foreground shrink-0" />
                {artifact.configSnapshot.lifecycle.setup.languages.map((lang, i) => (
                  <span key={i} className="text-[10px] bg-muted px-1.5 py-0.5 rounded font-mono leading-none">
                    {lang.name} {lang.version}
                  </span>
                ))}
              </div>
            )}

            {artifact.configSnapshot.lifecycle.build.steps.length > 0 && (
              <p className="text-xs text-primary/70 flex items-center gap-0.5">
                <HammerIcon className="size-3 shrink-0" />
                {artifact.configSnapshot.lifecycle.build.steps.length} step{artifact.configSnapshot.lifecycle.build.steps.length !== 1 ? 's' : ''}
              </p>
            )}
          </div>
        )}

        {data.state.message && (
          <p className="text-xs text-destructive line-clamp-2">
            {data.state.message}
          </p>
        )}

        {data.osService && (
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onClickActivity('start')}
            >
              <PlayIcon className="size-3" />
              Start
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onClickActivity('restart')}
            >
              <RotateCcwIcon className="size-3" />
              Restart
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onClickActivity('stop')}
            >
              <SquareIcon className="size-3" />
              Stop
            </Button>
          </div>
        )}

        <div className="flex justify-end gap-2">
          {data.state.status === 'deleted' && (
            <Button
              variant="outline"
              size="sm"
              onClick={onClickRestore}
            >
              <UndoIcon className="size-3" />
              Restore
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            className="text-destructive hover:text-destructive"
            onClick={onClickDelete}
          >
            <Trash2Icon className="size-3" />
            {data.state.status === 'deleted' ? 'Permanently Delete' : 'Delete'}
          </Button>
        </div>
      </div>
    </Card>
  );
}

DeploymentCard.ShimmerPlaceholder = function ShimmerPlaceholder() {
  return (
    <Card className="shadow-none rounded-lg">
      <div className="flex items-center pl-1 gap-x-1">
        <Shimmer className="mx-1 my-1.5 h-4 w-7" />
        <Shimmer className="mx-1 my-1.5 h-4 w-16" />
        <Shimmer className="mx-1 my-1.5 h-4 w-11" />
      </div>
      <div className="bg-card rounded-[7px] p-3 pt-2 flex flex-col gap-2">
        <Shimmer className="my-1 h-5 w-[30%]" />
        <Shimmer className="h-4 w-[60%]" />
        <Shimmer className="h-3 w-[45%]" />
      </div>
    </Card>
  );
};

export interface DeploymentListProps {
  list: CicdDeployment[];
  artifactList: CicdArtifact[];
}

export function DeploymentList({ list, artifactList }: DeploymentListProps) {
  const artifactMap = new Map(artifactList.map((a) => [a.id, a]));
  const emit = useEmit();

  const [handleActivity] = usePushServiceActivityUsecase({
    onSuccess: () => emit('@applications::detail/deployment-history-refresh', null),
  });

  return (
    <>
      {list.map((deployment) => (
        <DeploymentCard
          key={deployment.id}
          data={deployment}
          artifact={artifactMap.get(deployment.pointerIds.artifact)}
          onClickActivity={(activity) =>
            handleActivity({
              activity,
              serviceName: deployment.osService!.serviceName,
              targetServerId: deployment.serverSnapshot.id,
            })
          }
          onClickDelete={() =>
            emit('@applications::detail/deployment-delete', {
              deploymentId: deployment.id,
            })
          }
          onClickRestore={() =>
            emit('@applications::detail/deployment-restore', {
              applicationId: deployment.pointerIds.application,
              artifactId: deployment.pointerIds.artifact,
              workerId: deployment.pointerIds.machine,
            })
          }
        />
      ))}
    </>
  );
}
