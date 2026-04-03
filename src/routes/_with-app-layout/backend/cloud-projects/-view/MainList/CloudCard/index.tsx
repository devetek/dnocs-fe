import type { ComponentProps } from 'react';

import { CloudIcon } from 'lucide-react';

import IconGoogleCloudPlatform from '@/shared/assets/ico-gcloud.png';
import IconIDCloudHost from '@/shared/assets/ico-idcloudhost.svg';
import IconProxmox from '@/shared/assets/ico-proxmox.png';
import IconEye from '@/shared/presentation/icons/Eye';
import IconEyeActive from '@/shared/presentation/icons/EyeActive';
import IconLastDateActive from '@/shared/presentation/icons/LastDateActive';
import { ResourceCard } from '@/widgets/resource-card';

export interface CloudCardData {
  name?: string | null;
  provider?: string | null;
  lastUpdated?: string | null;
}

export interface CloudCardProps {
  data: CloudCardData;
  variant: 'compact' | 'full';
  onClickDetails: () => void;
  onClickDelete: () => void;
}

const PROVIDER_META: Record<string, { src?: string; label: string }> = {
  idcloudhost: { src: IconIDCloudHost, label: 'IDCloudHost' },
  gcp: { src: IconGoogleCloudPlatform, label: 'Google Cloud' },
  proxmox: { src: IconProxmox, label: 'Proxmox VE' },
};

export default function CloudCard(props: CloudCardProps) {
  const { data, variant, onClickDetails, onClickDelete } = props;
  const { name, provider, lastUpdated } = data;

  const meta =
    PROVIDER_META[provider?.toLocaleLowerCase() ?? ''] ??
    ({ label: provider ?? 'Unknown' } as { src?: string; label: string });

  const heroImage: string | typeof CloudIcon = meta.src ?? CloudIcon;

  type FullActions = ComponentProps<typeof ResourceCard.Full.Actions>['actions'];
  const actions: FullActions = [
    {
      label: 'View Regions',
      icon: IconEye,
      iconActive: IconEyeActive,
      onClick: onClickDetails,
    },
    {
      variant: 'destructive',
      label: 'Delete',
      onClick: onClickDelete,
    },
  ];

  if (variant === 'compact') {
    return (
      <ResourceCard.Compact>
        <ResourceCard.Compact.Main>
          <ResourceCard.Compact.Main.Hero
            image={heroImage}
            tooltipMessage={meta.label}
          />
          <ResourceCard.Compact.Main.Content
            title={name ?? undefined}
            status={[{ icon: CloudIcon, text: meta.label }]}
          />
        </ResourceCard.Compact.Main>
        <ResourceCard.Compact.Actions
          visibleActionOnlyIcon
          actions={actions}
          labelMore="More"
        />
        <ResourceCard.Compact.Footnote>
          <ResourceCard.Compact.Footnote.Item
            icon={IconLastDateActive}
            label="Last updated"
            value={lastUpdated ?? undefined}
          />
        </ResourceCard.Compact.Footnote>
      </ResourceCard.Compact>
    );
  }

  return (
    <ResourceCard.Full classNameCardWrapper="min-w-0 w-full">
      <ResourceCard.Full.Main>
        <ResourceCard.Full.Main.Hero
          image={heroImage}
          tooltipMessage={meta.label}
        />
        <ResourceCard.Full.Main.Content
          title={name ?? undefined}
          status={[{ icon: CloudIcon, text: meta.label }]}
        />
      </ResourceCard.Full.Main>

      <ResourceCard.Full.Actions
        visibleActionOnlyIcon
        labelMore="More"
        actions={actions}
      />

      <ResourceCard.Full.Footnote>
        <ResourceCard.Full.Footnote.Item
          label="Last updated"
          labelIcon={IconLastDateActive}
          value={lastUpdated ?? undefined}
        />
      </ResourceCard.Full.Footnote>
    </ResourceCard.Full>
  );
}
