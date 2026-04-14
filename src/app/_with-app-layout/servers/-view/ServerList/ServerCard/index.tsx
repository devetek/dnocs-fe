import {
  AppWindowMacIcon,
  BuildingIcon,
  HardHatIcon,
  HomeIcon,
  KeyIcon,
  UserCheck2Icon,
  UserIcon,
} from 'lucide-react';

import { useNavigate, useRouter } from '@tanstack/react-router';

import { useDevetekLocale, useDevetekTranslations } from '@/services/i18n';

import { SERVER_PROVIDER_METADATA } from '@/entities/server/ui/constants/provider-metadata';
import { SERVER_STATE_METADATA } from '@/entities/server/ui/constants/state-metadata';

import { getDistanceFromNow } from '@/shared/libs/browser/date';
import { iife } from '@/shared/libs/browser/fn';
import { cn } from '@/shared/libs/tailwind/cn';
import IconEye from '@/shared/presentation/icons/Eye';
import IconEyeActive from '@/shared/presentation/icons/EyeActive';
import IconLastDateActive from '@/shared/presentation/icons/LastDateActive';
import { ResourceCard } from '@/widgets/resource-card';

import type { ServerCardProps } from './types';

export default function ServerCard(props: ServerCardProps) {
  const {
    variant,
    data,

    onClickEdit,
    onClickStatus,
    onClickMigrateOwnership,
    onClickDelete,
    onClickReinstall,
  } = props;

  const t = useDevetekTranslations();
  const locale = useDevetekLocale();
  const navigate = useNavigate();
  const router = useRouter();

  const lastUpdated = getDistanceFromNow(data.timestamp.updated, locale);

  const detailsHref = router.buildLocation({ to: '/servers/$id', params: { id: data.id } }).href;

  const cnCardWrapper = cn({
    'border-red-500': data.state.status === 'failed',
    'border-orange-500 border-dashed': data.state.status === 'deleting',
    'border-cyan-500 border-dashed': data.state.status === 'progress',
  });

  const serverStateMetadata = SERVER_STATE_METADATA[data.state.status];

  const isAnomalousStatus = data.state.status !== 'ready';
  const statusBadgeColorClass = isAnomalousStatus
    ? `text-[var(${serverStateMetadata.color})]`
    : undefined;

  const { imageSrc: serverIconSrc } =
    SERVER_PROVIDER_METADATA[data.cloud?.provider ?? 'other'];

  const actions = [
    {
      label: t('common.actions.details'),
      icon: IconEye,
      iconActive: IconEyeActive,
      href: detailsHref,
    },
    data.state.status !== 'progress' && {
      label: t('common.actions.reinstall'),
      onClick: onClickReinstall,
    },
    data.state.status !== 'progress' &&
      !!onClickEdit && {
        label: t('common.actions.edit'),
        onClick: onClickEdit,
      },
    !!onClickMigrateOwnership && {
      label: t('common.actions.migrateOwnership'),
      onClick: onClickMigrateOwnership,
    },
    !!onClickDelete && {
      variant: 'destructive' as const,
      label: t('common.actions.delete'),
      onClick: onClickDelete,
    },
  ];

  const systemInfo = iife(() => {
    if (data.system.name && data.system.version) {
      return `${data.system.name}-${data.system.version}`;
    }

    if (data.system.name) {
      return data.system.name;
    }
  });

  if (variant === 'compact') {
    return (
      <ResourceCard.Compact
        classNameCardWrapper={cnCardWrapper}
        onClickBody={data.host.name ? () => navigate({ to: '/servers/$id', params: { id: data.id } }) : undefined}
      >
        <ResourceCard.Compact.Main>
          <ResourceCard.Compact.Main.Hero
            image={serverIconSrc}
            badge={isAnomalousStatus ? serverStateMetadata.icon : undefined}
            badgeTooltipMessage={
              isAnomalousStatus
                ? t(serverStateMetadata.i18n.statusLabel)
                : undefined
            }
            classNameBadge={statusBadgeColorClass}
          />
          <ResourceCard.Compact.Main.Content
            title={data.host.name}
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
        </ResourceCard.Compact.Main>

        <ResourceCard.Compact.TertiaryInfos
          infos={[
            {
              icon: UserCheck2Icon,
              infoLabel: t('common.terms.sshDefaultUser'),
              value: data.ssh.defaultUser,
            },
            {
              icon: HardHatIcon,
              infoLabel: t('common.terms.agent'),
              value: data.agent.version,
            },
            {
              icon: AppWindowMacIcon,
              infoLabel: t('common.terms.system'),
              value: systemInfo,
            },
          ]}
        />

        <ResourceCard.Compact.SecondaryInfos
          infos={[
            {
              icon: HomeIcon,
              infoLabel: t('common.terms.address'),
              value: data.host.address,
            },
            {
              icon: KeyIcon,
              infoLabel: t('common.terms.sshPort'),
              value: String(data.ssh.port),
            },
          ]}
        />

        <ResourceCard.Compact.Actions
          visibleActionOnlyIcon
          labelMore={t('common.actions.more')}
          actions={actions}
        />

        <ResourceCard.Compact.Footnote>
          <ResourceCard.Compact.Footnote.Item
            icon={serverStateMetadata.icon}
            label={t('common.terms.status')}
            value={t(serverStateMetadata.i18n.statusLabel)}
            onClick={onClickStatus}
            style={{
              wrapper: {
                color: `var(${serverStateMetadata.color})`,
              },
            }}
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
    <ResourceCard.Full
      classNameCardWrapper={cnCardWrapper}
    >
      <ResourceCard.Full.Main>
        <ResourceCard.Full.Main.Hero
          image={serverIconSrc}
          badge={isAnomalousStatus ? serverStateMetadata.icon : undefined}
          badgeTooltipMessage={
            isAnomalousStatus
              ? t(serverStateMetadata.i18n.statusLabel)
              : undefined
          }
          classNameBadge={statusBadgeColorClass}
        />
        <ResourceCard.Full.Main.Content
          title={data.host.name}
          onClickTitle={data.host.name ? () => navigate({ to: '/servers/$id', params: { id: data.id } }) : undefined}
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
      <ResourceCard.Full.Additionals slots={3}>
        <ResourceCard.Full.Additionals.PrimeInfo
          title={t('common.terms.address')}
          titleIcon={HomeIcon}
          value={data.host.address}
        />
        <ResourceCard.Full.Additionals.PrimeInfo
          title={t('common.terms.sshPort')}
          titleIcon={KeyIcon}
          value={String(data.ssh.port)}
        />
        <ResourceCard.Full.Additionals.SecondaryInfos
          infos={[
            {
              icon: UserCheck2Icon,
              infoLabel: t('common.terms.sshDefaultUser'),
              value: data.ssh.defaultUser,
            },
            {
              icon: HardHatIcon,
              infoLabel: t('common.terms.agent'),
              value: data.agent.version,
            },
            {
              icon: AppWindowMacIcon,
              infoLabel: t('common.terms.system'),
              value: systemInfo,
            },
          ]}
        />
      </ResourceCard.Full.Additionals>
      <ResourceCard.Full.Footnote>
        <ResourceCard.Full.Footnote.Item
          label="Status"
          value={t(serverStateMetadata.i18n.statusLabel)}
          valueIcon={serverStateMetadata.icon}
          onClick={onClickStatus}
          style={{
            valueWrapper: {
              color: `var(${serverStateMetadata.color})`,
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
