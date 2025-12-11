import type { ReactNode } from 'react';

import type { CicdArtifact } from '@/entities/cicd-artifact/rules/schema';

import type { DeploymentStatus } from '../../_lib';

export interface ArtifactCardProps {
  deploymentStatus?: DeploymentStatus;
  data: CicdArtifact;

  onClickLogs?: () => void;
  onClickRollback?: () => void;
  onClickDelete?: () => void;
  onClickCancel?: () => void;
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
