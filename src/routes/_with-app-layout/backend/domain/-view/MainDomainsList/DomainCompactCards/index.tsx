import type { ComponentProps } from 'react';

import {
  BuildingIcon,
  CheckCircleIcon,
  ShieldCheckIcon,
  UserIcon,
} from 'lucide-react';

import { useDevetekLocale, useDevetekTranslations } from '@/services/i18n';

import type { DomainEssentials } from '@/entities/domain/rules/schema';
import '@/shared/libs/browser/fn-extensions';
import { DOMAIN_PROVIDER_BRANDS } from '@/entities/domain/ui/constants/provider';
import type { SchemaCommon } from '@/entities/shared/rules/schema';

import { getDistanceFromNow } from '@/shared/libs/browser/date';
import LayoutAutoGridList from '@/shared/presentation/atoms/LayoutAutoGridList';
import IconEye from '@/shared/presentation/icons/Eye';
import IconEyeActive from '@/shared/presentation/icons/EyeActive';
import IconLastDateActive from '@/shared/presentation/icons/LastDateActive';
import { ResourceCard } from '@/widgets/resource-card';

import { useEmit } from '../../../-models/events';

import type { CardProps, DomainCompactCardsProps as Props } from './types';

const Card = (props: CardProps) => {
  const { actions, data } = props;

  const t = useDevetekTranslations();
  const locale = useDevetekLocale();

  const providerBrands = DOMAIN_PROVIDER_BRANDS[data.provider];

  const lastUpdated = getDistanceFromNow(data.timestamp.updated, locale);

  return (
    <ResourceCard.Compact>
      <ResourceCard.Compact.Main>
        <ResourceCard.Compact.Main.Hero
          image={providerBrands.icon}
          tooltipMessage={t(providerBrands.i18n.brandName)}
        />
        <ResourceCard.Compact.Main.Content
          title={`*.${data.domain.hostname}`}
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
      <ResourceCard.Compact.Actions
        visibleActionOnlyIcon
        actions={actions}
        labelMore={t('common.actions.more')}
      />
      <ResourceCard.Compact.Footnote>
        <ResourceCard.Compact.Footnote.StatusIcons
          icons={[
            ({ className }) => <CheckCircleIcon className={className} />,
            ({ className }) => <ShieldCheckIcon className={className} />,
          ]}
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
};

export default function DomainCompactCards(props: Props) {
  const { list } = props;

  const t = useDevetekTranslations();

  const emit = useEmit();

  const handleClickDetails = (_: unknown, id: SchemaCommon.UnitId) => {
    emit('@domain-dns/open--details', id);
  };

  const handleClickMigrateOwnership = (payload: DomainEssentials) => {
    emit('@domain-dns/open--migrate-ownership', payload);
  };

  const handleClickDelete = (payload: DomainEssentials) => {
    emit('@domain-dns/domain--delete', payload);
  };

  return (
    <LayoutAutoGridList viewMode="grid">
      {list.map((item) => {
        type Actions = ComponentProps<
          typeof ResourceCard.Full.Actions
        >['actions'];
        const actions: Actions = [
          {
            label: t('common.actions.details'),
            icon: IconEye,
            iconActive: IconEyeActive,
            onClick: handleClickDetails.intoEvent(null, item.id),
          },
          {
            label: t('common.actions.migrateOwnership'),
            onClick: handleClickMigrateOwnership.intoEvent(item),
            disabled: true,
          },
          {
            variant: 'destructive',
            label: t('common.actions.delete'),
            onClick: handleClickDelete.intoEvent(item),
          },
        ];

        return <Card key={item.id} data={item} actions={actions} />;
      })}
    </LayoutAutoGridList>
  );
}
