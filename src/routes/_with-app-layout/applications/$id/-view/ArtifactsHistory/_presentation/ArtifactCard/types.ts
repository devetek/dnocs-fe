import type { ReactNode } from 'react';

import type { CicdArtifact } from '@/entities/cicd-artifact/rules/schema';

import type { DeploymentStatus } from '../../_lib';

export interface LogsOption {
  label: string;
  machineId: string;
  onClick: () => void;
}

export interface ArtifactCardProps {
  deploymentStatus?: DeploymentStatus;
  data: CicdArtifact;

  onClickLogs?: () => void;
  logsOptions?: LogsOption[];
  onClickRollback?: () => void;
  onClickDelete?: () => void;
  onClickStatus?: () => void;
}

export interface HeadingItemWrapperProps {
  className?: string;
  tooltipMessage?: string;
  children: ReactNode;
}

export interface CardWrapperProps {
  deploymentStatus?: DeploymentStatus;
  children: ReactNode;
}

export interface StatusBadgeWrapperProps {
  className?: string;
  children: ReactNode;
  onClick?: () => void;
}

export interface StatusBadgeProps {
  deploymentStatus?: DeploymentStatus;
  onClickStatus?: () => void;
}
