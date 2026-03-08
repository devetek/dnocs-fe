import type { ComponentProps, ReactNode } from 'react';

import {
  BuildingIcon,
  GlobeIcon,
  ShieldEllipsisIcon,
  SignpostIcon,
  UserIcon,
} from 'lucide-react';

import { useDevetekLocale, useDevetekTranslations } from '@/services/i18n';

import { LOAD_BALANCER_FEATURES } from '@/entities/load-balancer/ui/constants/features';
import { LOAD_BALANCER_STATUS_METADATA } from '@/entities/load-balancer/ui/constants/state-metadata';
import { LOAD_BALANCER_WEBSERVER_ENGINE } from '@/entities/load-balancer/ui/constants/webserver';

import { getDistanceFromNow } from '@/shared/libs/browser/date';
import { iife } from '@/shared/libs/browser/fn';
import { IconServer } from '@/shared/presentation/icons';
import IconEye from '@/shared/presentation/icons/Eye';
import IconEyeActive from '@/shared/presentation/icons/EyeActive';
import IconLastDateActive from '@/shared/presentation/icons/LastDateActive';
import {
  IconLoadBalancerL4,
  IconLoadBalancerL7,
} from '@/shared/presentation/icons/LoadBalancerLevels';
import { ResourceCard } from '@/widgets/resource-card';

import type { LbCardProps } from './types';

export default function LbCard(props: LbCardProps) {
  const {
    data,
    variant,
    onClickDetails,
    onClickEdit,
    onClickMigrateOwnership,
    onClickDelete,
  } = props;

  const t = useDevetekTranslations();
  const locale = useDevetekLocale();

  const lbState = LOAD_BALANCER_STATUS_METADATA[data.state.status];
  const lbWebserver = LOAD_BALANCER_WEBSERVER_ENGINE[data.webserver.engine];

  const featuresEl: ReactNode = (
    <span className="flex flex-wrap gap-1 py-0.25">
      {Array.from(data.features).map((feature) => {
        const metadata = LOAD_BALANCER_FEATURES[feature];

        return <img className="h-4" src={metadata.logoSrc} alt={feature} />;
      })}
    </span>
  );

  const featuresTooltip = Array.from(data.features)
    .map((feature) => t(LOAD_BALANCER_FEATURES[feature].i18n.label))
    .join(', ');

  const elLbKind = data.configuration.lbKind.toLocaleUpperCase();

  const elRulesDesc = iife(() => {
    switch (data.configuration.lbKind) {
      case 'l4':
        return t('page.loadBalancers.xPorts', {
          length: data.configuration.ports.length,
        });

      case 'l7':
        return t('page.loadBalancers.xUpstream', {
          length: data.configuration.rules.length,
        });
    }
  });

  const badgeIcon = iife(() => {
    switch (data.configuration.lbKind) {
      case 'l4':
        return IconLoadBalancerL4;

      case 'l7':
        return IconLoadBalancerL7;
    }
  });

  const lastUpdated = getDistanceFromNow(data.timestamp.updated, locale);

  type Actions = ComponentProps<typeof ResourceCard.Full.Actions>['actions'];
  const actions: Actions = [
    {
      label: t('common.actions.details'),
      icon: IconEye,
      iconActive: IconEyeActive,
      onClick: onClickDetails,
    },
    !!onClickEdit && {
      label: t('common.actions.edit'),
      onClick: onClickEdit,
    },
    {
      label: t('common.actions.migrateOwnership'),
      onClick: onClickMigrateOwnership,
      disabled: true,
    },
    {
      variant: 'destructive',
      label: t('common.actions.delete'),
      onClick: onClickDelete,
    },
  ];

  if (variant === 'compact') {
    return (
      <ResourceCard.Compact>
        <ResourceCard.Compact.Main>
          <ResourceCard.Compact.Main.Hero
            image={lbWebserver.icon}
            tooltipMessage={t(lbWebserver.i18n.brandName)}
            badge={badgeIcon}
          />
          <ResourceCard.Compact.Main.Content
            title={data.domain.fqdn}
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
        {/* <ResourceCard.Compact.TertiaryInfos
          infos={[
            {
              infoLabel: t('page.loadBalancers.gatewayServerAndAddress'),
              icon: IconServer,
              value: data.gateway.server.hostname,
            },
            {
              infoLabel: t('page.loadBalancers.gatewayAddress'),
              icon: GlobeIcon,
              value: data.gateway.address,
            },
          ]}
        /> */}
        <ResourceCard.Compact.SecondaryInfos
          infos={[
            {
              infoLabel: t('page.loadBalancers.gatewayServerAndAddress'),
              icon: IconServer,
              value: data.gateway.server.hostname,
            },
            {
              infoLabel: t('page.loadBalancers.gatewayAddress'),
              icon: GlobeIcon,
              value: data.gateway.address,
            },
          ]}
        />
        <ResourceCard.Compact.Actions
          visibleActionOnlyIcon
          actions={actions}
          labelMore={t('common.actions.more')}
        />
        <ResourceCard.Compact.Footnote>
          <ResourceCard.Compact.Footnote.StatusIcons
            icons={[
              ({ className }) => (
                <lbState.icon
                  className={className}
                  style={{ color: `var(${lbState.color})` }}
                />
              ),
            ]}
            tooltipMessage={t(lbState.i18n.statusLabel)}
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
    <ResourceCard.Full>
      <ResourceCard.Full.Main>
        <ResourceCard.Full.Main.Hero
          image={lbWebserver.icon}
          tooltipMessage={t(lbWebserver.i18n.brandName)}
          badge={badgeIcon}
        />
        <ResourceCard.Full.Main.Content
          title={data.domain.fqdn}
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
          title={`${t('common.terms.rules')} (${elLbKind})`}
          titleIcon={SignpostIcon}
          value={<span>{elRulesDesc}</span>}
        />
        <ResourceCard.Full.Additionals.PrimeInfo
          title={t('page.loadBalancers.features')}
          titleIcon={ShieldEllipsisIcon}
          valueTooltip={featuresTooltip}
          value={featuresEl}
        />
        <ResourceCard.Full.Additionals.SecondaryInfos
          infos={[
            {
              infoLabel: t('page.loadBalancers.gatewayServer'),
              icon: IconServer,
              value: data.gateway.server.hostname,
            },
            {
              infoLabel: t('page.loadBalancers.gatewayAddress'),
              icon: GlobeIcon,
              value: data.gateway.address,
            },
          ]}
        />
      </ResourceCard.Full.Additionals>

      <ResourceCard.Full.Actions
        visibleActionOnlyIcon
        labelMore={t('common.actions.more')}
        actions={actions}
      />

      <ResourceCard.Full.Footnote>
        <ResourceCard.Full.Footnote.Item
          label={t('common.terms.status')}
          value={t(lbState.i18n.statusLabel)}
          valueIcon={lbState.icon}
          style={{
            valueWrapper: {
              color: `var(${lbState.color})`,
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
    </ResourceCard.Full>
  );
}
