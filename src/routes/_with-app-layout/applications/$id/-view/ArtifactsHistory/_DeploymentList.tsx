import {
  AppWindowIcon,
  BoltIcon,
  Calendar,
  CheckIcon,
  ClockIcon,
  GitBranchIcon,
  HashIcon,
  LoaderCircle,
  OctagonAlertIcon,
  ServerIcon,
  UserCogIcon,
  XIcon,
} from 'lucide-react';

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
}

function DeploymentCard({ data, artifact }: DeploymentCardProps) {
  const locale = useDevetekLocale();
  const updatedAt = getDistanceFromNow(data.timestamp.updated, locale);

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
          <p className="text-xs text-primary/70 flex items-center gap-0.5">
            <ServerIcon className="size-3" />
            {data.serverSnapshot.hostName}
          </p>

          {data.osService && (
            <p className="text-xs text-primary/70 flex items-center gap-0.5">
              <AppWindowIcon className="size-3" />
              {data.osService.serviceName}
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

        {data.state.message && (
          <p className="text-xs text-destructive line-clamp-2">
            {data.state.message}
          </p>
        )}
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

  return (
    <>
      {list.map((deployment) => (
        <DeploymentCard
          key={deployment.id}
          data={deployment}
          artifact={artifactMap.get(deployment.pointerIds.artifact)}
        />
      ))}
    </>
  );
}
