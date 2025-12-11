import {
  CheckIcon,
  ExternalLinkIcon,
  LoaderCircle,
  OctagonAlertIcon,
  XIcon,
} from 'lucide-react';

import { useDevetekTranslations } from '@/services/i18n';

import { cn } from '@/shared/libs/tailwind/cn';
import { Card } from '@/shared/presentation/atoms/Card';
import { Tooltip } from '@/shared/presentation/atoms/Tooltip';

import type {
  CardWrapperProps,
  HeadingItemWrapperProps,
  StatusBadgeProps,
  StatusBadgeWrapperProps,
} from './types';

const CardWrapper = (props: CardWrapperProps) => {
  const { children, deploymentStatus } = props;

  const cnCardWrapper = cn('shadow-none rounded-lg ', {
    'border-green-600/40': deploymentStatus === 'deployed',
    'border-red-600/40': deploymentStatus === 'failed',
    'border-yellow-600/40': deploymentStatus === 'progress',
  });

  return <Card className={cnCardWrapper}>{children}</Card>;
};

const HeadingItemWrapper = (props: HeadingItemWrapperProps) => {
  const { className, children, tooltipMessage } = props;

  const cnWrapper = cn(
    'text-xs font-semibold px-1 py-1.5 flex items-center shrink-0 gap-0.5 w-max overflow-hidden',
    className,
  );

  return (
    <Tooltip message={tooltipMessage} className={cnWrapper}>
      {children}
    </Tooltip>
  );
};

const StatusBadgeWrapper = (props: StatusBadgeWrapperProps) => {
  const { className, children, onClick } = props;

  const cnWrapperBase = cn(
    'rounded-tr-[7px] rounded-bl-md pl-1.5 pr-3',
    className,
  );

  return (
    <HeadingItemWrapper className={cnWrapperBase}>
      <span
        className="cursor-pointer flex items-center gap-0.5 hover:underline"
        onClick={onClick}
      >
        {children}
        <ExternalLinkIcon className="size-3 pl-0.5" />
      </span>
    </HeadingItemWrapper>
  );
};

const StatusBadge = (props: StatusBadgeProps) => {
  const { deploymentStatus, onClickStatus } = props;

  const t = useDevetekTranslations();

  if (deploymentStatus === 'deployed') {
    return (
      <StatusBadgeWrapper
        className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
        onClick={onClickStatus}
      >
        <CheckIcon className="w-4 h-4 stroke-green-800 dark:stroke-green-200" />
        {t('common.terms.deployed')}
      </StatusBadgeWrapper>
    );
  }

  if (deploymentStatus === 'failed') {
    return (
      <StatusBadgeWrapper
        className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200"
        onClick={onClickStatus}
      >
        <XIcon className="w-4 h-4 stroke-red-800 dark:stroke-red-200" />
        {t('common.terms.failed')}
      </StatusBadgeWrapper>
    );
  }

  if (deploymentStatus === 'progress') {
    return (
      <StatusBadgeWrapper
        className="bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200"
        onClick={onClickStatus}
      >
        <LoaderCircle className="w-4 h-4 stroke-yellow-800 dark:stroke-yellow-200 animate-spin" />
        {t('common.terms.inProgress')}
      </StatusBadgeWrapper>
    );
  }

  if (deploymentStatus === 'cancelled') {
    return (
      <StatusBadgeWrapper
        className="bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200"
        onClick={onClickStatus}
      >
        <OctagonAlertIcon className="w-4 h-4 mr-0.5 stroke-yellow-800 dark:stroke-yellow-200" />
        {t('common.terms.cancelled')}
      </StatusBadgeWrapper>
    );
  }

  return null;
};

export const ArtifactCardPartials = {
  CardWrapper,
  HeadingItemWrapper,
  StatusBadgeWrapper,
  StatusBadge,
};
