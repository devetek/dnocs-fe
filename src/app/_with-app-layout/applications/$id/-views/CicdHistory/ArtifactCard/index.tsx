import { useMemo } from 'react';

import {
  AmphoraIcon,
  ArrowUpFromLineIcon,
  CalendarIcon,
  ClockIcon,
  CogIcon,
  GitCommitVerticalIcon,
  InfoIcon,
  LoaderCircleIcon,
  OctagonAlertIcon,
  Redo2Icon,
  TrashIcon,
  TriangleAlertIcon,
  UserCogIcon,
  XIcon,
} from 'lucide-react';

import { useDevetekLocale, useDevetekTranslations } from '@/services/i18n';

import {
  getDistanceFromNow,
  humanizeSeconds,
} from '@/shared/libs/browser/date';
import { excludeFalsy } from '@/shared/libs/browser/typeguards';
import { cn } from '@/shared/libs/tailwind/cn';

import useSeeFullStateMessage from '../../../-usecases/use-see-full-state-message';
import type { CicdCardTypes } from '../../-presentations/CicdCard';
import CicdCard from '../../-presentations/CicdCard';
import { CommitInfo, TraceMessage } from '../-presentations';
import type { Props } from './-types';

export type * as ArtifactCardTypes from './-types';

export default function ArtifactCard(props: Props) {
  const { isLatest, data } = props;

  const t = useDevetekTranslations();
  const locale = useDevetekLocale();

  const { handleSeeFulLStateMessage } = useSeeFullStateMessage();

  const handleViewFullStateMessage = () => {
    handleSeeFulLStateMessage(data.state);
  };

  const cardHeaderAttributes: CicdCardTypes.Attribute[] = [
    {
      id: 'id',
      icon: AmphoraIcon,
      label: `№ ${data.id}`,
    },
    {
      id: 'commit-info',
      label: (
        <>
          <span className="font-roboto-mono font-medium">
            {data.commitMetadata.head.slice(0, 7)}
          </span>
          ·
          <span className="font-roboto-mono font-medium">
            {data.commitMetadata.fromBranch}
          </span>
        </>
      ),
      icon: GitCommitVerticalIcon,
    },
    data.timestamp.buildTimeInSeconds > 0 && {
      id: 'build-time',
      icon: ClockIcon,
      label: humanizeSeconds(data.timestamp.buildTimeInSeconds),
    },
    {
      id: 'stale-info',
      color: 'severe' as const,
      frame: 'solid' as const,
      icon: TriangleAlertIcon,
      label: 'Stale config',
    },
  ].filter(excludeFalsy);

  const actions: CicdCardTypes.Action[] = [
    isLatest && {
      id: 'deploy',
      icon: ArrowUpFromLineIcon,
      label: 'Deploy',
      isPrimary: true,
    },
    {
      icon: CogIcon,
      id: 'details',
      label: 'Details',
    },
    !isLatest && {
      id: 'rollback',
      icon: Redo2Icon,
      label: 'Rollback',
    },
    {
      id: 'delete',
      color: 'danger' as const,
      icon: TrashIcon,
      label: 'Delete',
    },
  ].filter(excludeFalsy);

  const cardBadge = useMemo((): CicdCardTypes.Attribute | undefined => {
    switch (data.state.status) {
      case 'progress':
        return {
          id: 'progress',
          label: t('common.terms.inProgress'),
          icon: (iconProps) => (
            <LoaderCircleIcon
              {...iconProps}
              className={cn('animate-spin', iconProps.className)}
            />
          ),
        };

      case 'failed':
        return {
          id: 'failed',
          label: t('common.terms.failed'),
          icon: XIcon,
        };

      case 'cancelled':
        return {
          id: 'cancelled',
          label: t('common.terms.cancelled'),
          icon: OctagonAlertIcon,
        };
    }

    if (isLatest) {
      return {
        id: 'latest',
        label: 'Latest',
        icon: InfoIcon,
      };
    }

    return;
  }, [isLatest, data.state.status, t]);

  const cardAccent = useMemo((): CicdCardTypes.CardAccent | undefined => {
    switch (data.state.status) {
      case 'failed':
        return 'error';

      case 'progress':
      case 'cancelled':
        return 'warning';
    }

    if (isLatest) {
      return 'info';
    }

    return undefined;
  }, [data.state.status, isLatest]);

  return (
    <CicdCard
      cardAccent={cardAccent}
      cardBadge={cardBadge}
      headerAttributes={cardHeaderAttributes}
      aside={<CicdCard.Actions actions={actions} />}
    >
      <div className="flex flex-col grow">
        <CommitInfo metadata={data.commitMetadata} />

        {data.state.message && (
          <TraceMessage
            className="px-3 pb-2"
            status={data.state.status}
            message={data.state.message}
            onSeeMore={handleViewFullStateMessage}
          />
        )}
      </div>

      <CicdCard.Footer
        attributes={[
          {
            id: 'executor-username',
            icon: UserCogIcon,
            label: data.executor.userName,
          },
          {
            id: 'updated-at',
            icon: CalendarIcon,
            label: getDistanceFromNow(data.timestamp.updated, locale),
          },
        ]}
      />
    </CicdCard>
  );
}
