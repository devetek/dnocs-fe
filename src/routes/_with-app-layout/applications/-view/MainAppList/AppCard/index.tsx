import { BuildingIcon, Code2Icon, GithubIcon, GitBranchIcon, ServerIcon, UserIcon } from 'lucide-react';

import { useNavigate } from '@tanstack/react-router';

import { useAuthLoggedIn } from '@/services/auth';
import { useDevetekLocale, useDevetekTranslations } from '@/services/i18n';

import { getBundleIcon, getSourceBadge } from '@/entities/application/ui/lib';

import { getDistanceFromNow } from '@/shared/libs/browser/date';
import { capitalizeFirstLetter } from '@/shared/libs/browser/string';
import { cn } from '@/shared/libs/tailwind/cn';
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
    onClickMigrateOwnership,
    onClickDetails,
  } = props;

  const t = useDevetekTranslations();
  const locale = useDevetekLocale();
  const { gitProfile } = useAuthLoggedIn();

  const navigate = useNavigate();

  const { status: lastArtifactStatus } = data.state.lastArtifact;

  const lastUpdated = getDistanceFromNow(data.timestamp.updated, locale);

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
      label: t('common.actions.migrateOwnership'),
      onClick: onClickMigrateOwnership,
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
    const sourceValue = data.identity.source === 'repository'
      ? `${data.identity.repoOrganization}/${data.identity.repoName}`
      : undefined;

    const deployValue = data.configDefs.cicd.autoDeploy.enabled
      ? data.configDefs.cicd.autoDeploy.fromBranch
      : t('common.terms.off');

    return (
      <ResourceCard.Compact
        classNameCardWrapper={cnCardWrapper}
        onClickBody={onClickDetails}
      >
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
            />
          </div>
        </ResourceCard.Compact.Main>
        <ResourceCard.Compact.SecondaryInfos
          infos={[
            {
              icon: GithubIcon,
              infoLabel: t('common.terms.source'),
              value: sourceValue,
            },
            {
              icon: GitBranchIcon,
              infoLabel: t('common.terms.deploy'),
              value: deployValue,
            },
          ]}
        />
        <ResourceCard.Compact.Actions
          visibleActionOnlyIcon
          labelMore={t('common.actions.more')}
          actions={actions}
        />
        <ResourceCard.Compact.Footnote>
          {data.configDefs.lifecycle?.setup.languages[0] && (
            <ResourceCard.Compact.Footnote.Item
              icon={Code2Icon}
              label={t('common.terms.language')}
              value={`${data.configDefs.lifecycle.setup.languages[0].name} ${data.configDefs.lifecycle.setup.languages[0].version}`}
            />
          )}
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

  const sourceValue = data.identity.source === 'repository'
    ? `${data.identity.repoOrganization}/${data.identity.repoName}`
    : undefined;

  return (
    <ResourceCard.Full
      classNameCardWrapper={cnCardWrapper}
      onClickBody={onClickDetails}
    >
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
        />
      </ResourceCard.Full.Main>
      <ResourceCard.Full.Additionals slots={2}>
        <ResourceCard.Full.Additionals.PrimeInfo
          title={t('common.terms.source')}
          titleIcon={GithubIcon}
          value={sourceValue}
        />
        <ResourceCard.Full.Additionals.PrimeInfoList
          title={t('common.terms.deploy')}
          titleIcon={ServerIcon}
          infos={data.additionalInfo.servers.map((server) => ({
            icon: ServerIcon,
            infoLabel: server.name,
            value: server.name,
            onClick: () => navigate({ to: '/servers/$id', params: { id: String(server.id) } }),
          }))}
        />
      </ResourceCard.Full.Additionals>
      <ResourceCard.Full.Footnote>
        {data.configDefs.lifecycle?.setup.languages[0] && (
          <ResourceCard.Full.Footnote.Item
            label={t('common.terms.language')}
            labelIcon={Code2Icon}
            value={`${data.configDefs.lifecycle.setup.languages[0].name} ${data.configDefs.lifecycle.setup.languages[0].version}`}
          />
        )}
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
