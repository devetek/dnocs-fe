import { BuildingIcon, CalendarIcon, GlobeIcon, UserIcon } from 'lucide-react';

import { useAuthLoggedIn } from '@/services/auth';
import { useDevetekLocale, useDevetekTranslations } from '@/services/i18n';

import { getBundleIcon, getSourceBadge } from '@/entities/application/ui/lib';
import { CICD_ARTIFACT_STATUS_METADATA } from '@/entities/cicd-artifact/ui/constants/state-metadata';
import { OS_SERVICE_STATE_METADATA } from '@/entities/os-service/ui/constants/state-metadata';

import { getDistanceFromNow } from '@/shared/libs/browser/date';
import { capitalizeFirstLetter } from '@/shared/libs/browser/string';
import { cn } from '@/shared/libs/tailwind/cn';
import { IconServer } from '@/shared/presentation/icons';
import IconEye from '@/shared/presentation/icons/Eye';
import IconEyeActive from '@/shared/presentation/icons/EyeActive';
import IconLastDateActive from '@/shared/presentation/icons/LastDateActive';
import { ResourceCard } from '@/widgets/resource-card';

import type { AppCardProps } from './types';

export default function AppCard(props: AppCardProps) {
  const {
    variant,
    data,
    onClickEdit,
    onClickDelete,
    onClickClaimToOrganization,
    onClickDetails,
  } = props;

  const t = useDevetekTranslations();
  const locale = useDevetekLocale();
  const { gitProfile } = useAuthLoggedIn();

  const { status: lastArtifactStatus } = data.state.lastArtifact;

  const serviceState = OS_SERVICE_STATE_METADATA[data.state.service];
  const artifactState = CICD_ARTIFACT_STATUS_METADATA[lastArtifactStatus];

  const lastUpdated = getDistanceFromNow(data.timestamp.updated, locale);
  const dateCreated = getDistanceFromNow(data.timestamp.created, locale);

  const handleClickAppDomain = () => {
    const { domain } = data.additionalInfo;

    if (!domain) return undefined;

    const refinedDomain = /^https?:\/\//.test(domain)
      ? domain
      : `https://${domain}`;

    window.open(refinedDomain, '_blank');
  };

  const cnCardWrapper = cn({
    'border-red-500': lastArtifactStatus === 'failed',
    'border-orange-500 border-dashed': lastArtifactStatus === 'deleting',
    'border-cyan-500 border-dashed': lastArtifactStatus === 'progress',
  });

  const actions = [
    {
      label: t('common.actions.details'),
      icon: IconEye,
      iconActive: IconEyeActive,
      onClick: onClickDetails,
    },
    !!onClickEdit &&
      data.identity.source === 'repository' && {
        disabled: !gitProfile,
        label: t('common.actions.edit'),
        onClick: onClickEdit,
      },
    {
      label: t('common.actions.claim'),
      onClick: onClickClaimToOrganization,
    },
    {
      variant: 'destructive' as const,
      label: t('common.actions.delete'),
      onClick: onClickDelete,
    },
  ];

  const getBadgeTooltip = () => {
    if (data.identity.source === 'repository') {
      return capitalizeFirstLetter(data.identity.sourceKind);
    }

    return undefined;
  };

  if (variant === 'compact') {
    const { icon: ArtifactStateIcon, color: artifactStateColor } =
      artifactState;

    const { icon: ServiceStateIcon, color: serviceStateColor } = serviceState;

    return (
      <ResourceCard.Compact classNameCardWrapper={cnCardWrapper} onClickBody={onClickDetails}>
        <ResourceCard.Compact.Main>
          <div className="flex items-start gap-x-2 w-full text-left">
            <ResourceCard.Compact.Main.Hero
              image={getBundleIcon(data.identity.bundleType)}
              badge={getSourceBadge(data.identity)}
              badgeTooltipMessage={getBadgeTooltip()}
            />
            <ResourceCard.Compact.Main.Content
              title={data.identity.name}
              status={[
                !!data.ownership.team && {
                  icon: BuildingIcon,
                  text: data.ownership.team,
                },
                {
                  icon: UserIcon,
                  text: data.ownership.owner,
                },
              ]}
              subStatus={[
                {
                  icon: CalendarIcon,
                  text: `${t('common.terms.createdAt')} ${dateCreated}`,
                },
                {
                  icon: CalendarIcon,
                  text: `${t('common.terms.lastUpdated')} ${lastUpdated}`,
                },
              ]}
            />
          </div>
        </ResourceCard.Compact.Main>
        <ResourceCard.Compact.SecondaryInfos
          infos={[
            {
              icon: IconServer,
              infoLabel: t('common.terms.server'),
              value: data.additionalInfo.server?.name,
            },
          ]}
        />
        <ResourceCard.Compact.Actions
          visibleActionOnlyIcon
          labelMore={t('common.actions.more')}
          actions={actions}
        />
        <ResourceCard.Compact.Footnote>
          <ResourceCard.Compact.Footnote.StatusIcons
            icons={[
              ({ className }) => (
                <ArtifactStateIcon
                  className={className}
                  style={{ color: `var(${artifactStateColor})` }}
                />
              ),
              ({ className }) => (
                <ServiceStateIcon
                  className={className}
                  style={{ color: `var(${serviceStateColor})` }}
                />
              ),
            ]}
            tooltipMessage="Status and Service State"
          />
          <ResourceCard.Compact.Footnote.Spacer />
          <ResourceCard.Compact.Footnote.Item
            icon={IconLastDateActive}
            label={t('common.terms.lastUpdated')}
            value={lastUpdated}
          />
        </ResourceCard.Compact.Footnote>
      </ResourceCard.Compact>
    );
  }

  return (
    <ResourceCard.Full classNameCardWrapper={cnCardWrapper} onClickBody={onClickDetails}>
      <ResourceCard.Full.Main>
        <ResourceCard.Full.Main.Hero
          image={getBundleIcon(data.identity.bundleType)}
          badge={getSourceBadge(data.identity)}
          badgeTooltipMessage={getBadgeTooltip()}
        />
        <ResourceCard.Full.Main.Content
          title={data.identity.name}
          status={[
            !!data.ownership.team && {
              icon: BuildingIcon,
              text: data.ownership.team,
            },
            {
              icon: UserIcon,
              text: data.ownership.owner,
            },
          ]}
          subStatus={[
            {
              icon: CalendarIcon,
              text: `${t('common.terms.createdAt')} ${dateCreated}`,
            },
            {
              icon: CalendarIcon,
              text: `${t('common.terms.lastUpdated')} ${lastUpdated}`,
            },
          ]}
        />
      </ResourceCard.Full.Main>
      <ResourceCard.Full.Additionals slots={2}>
        <ResourceCard.Full.Additionals.PrimeInfo
          title={t('common.terms.server')}
          titleIcon={IconServer}
          value={data.additionalInfo.server?.name}
        />
      </ResourceCard.Full.Additionals>
      <ResourceCard.Full.Footnote>
        <ResourceCard.Full.Footnote.Item
          label={t('common.terms.artifact')}
          value={t(artifactState.i18n.statusLabel)}
          valueIcon={artifactState.icon}
          style={{
            valueWrapper: {
              color: `var(${artifactState.color})`,
            },
          }}
        />
        <ResourceCard.Full.Footnote.Item
          label={t('common.terms.service')}
          value={t(serviceState.i18n.statusLabel)}
          valueIcon={serviceState.icon}
          style={{
            valueWrapper: {
              color: `var(${serviceState.color})`,
            },
          }}
        />
        <ResourceCard.Full.Footnote.Spacer />
        <ResourceCard.Full.Footnote.Item
          label={t('common.terms.lastUpdated')}
          labelIcon={IconLastDateActive}
          value={lastUpdated}
        />
      </ResourceCard.Full.Footnote>
      <ResourceCard.Full.Actions
        visibleActionOnlyIcon
        labelMore={t('common.actions.more')}
        actions={actions}
      />
    </ResourceCard.Full>
  );
}
