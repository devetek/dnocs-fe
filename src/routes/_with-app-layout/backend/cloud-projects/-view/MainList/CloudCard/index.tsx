import type { ComponentProps } from 'react';

import { BuildingIcon, CloudIcon, UserIcon } from 'lucide-react';

import IconGoogleCloudPlatform from '@/shared/assets/ico-gcloud.png';
import IconIDCloudHost from '@/shared/assets/ico-idcloudhost.svg';
import IconProxmox from '@/shared/assets/ico-proxmox.png';
import IconEye from '@/shared/presentation/icons/Eye';
import IconEyeActive from '@/shared/presentation/icons/EyeActive';
import IconLastDateActive from '@/shared/presentation/icons/LastDateActive';
import { ResourceCard } from '@/widgets/resource-card';

import { useEmit } from '../../../-model/events';
import type { CloudTableData } from '../CloudTable';

export interface CloudCardProps {
  data: CloudTableData;
}

const PROVIDER_META: Record<string, { src?: string; label: string }> = {
  idcloudhost: { src: IconIDCloudHost, label: 'IDCloudHost' },
  gcp: { src: IconGoogleCloudPlatform, label: 'Google Cloud' },
  proxmox: { src: IconProxmox, label: 'Proxmox VE' },
};

export default function CloudCard(props: CloudCardProps) {
  const { data } = props;
  const { id, name, provider, lastUpdated, ownerName, teamName } = data;

  const emit = useEmit();

  const meta =
    PROVIDER_META[provider?.toLocaleLowerCase() ?? ''] ??
    ({ label: provider ?? 'Unknown' } as { src?: string; label: string });

  const heroImage: string | typeof CloudIcon = meta.src ?? CloudIcon;

  const handleClickDetails = () =>
    emit('@cloud-projects/open--details', {
      cloudProjectId: String(id),
      cloudProjectName: name ?? '',
    });

  type Actions = ComponentProps<typeof ResourceCard.Compact.Actions>['actions'];
  const actions: Actions = [
    {
      label: 'View Regions',
      icon: IconEye,
      iconActive: IconEyeActive,
      onClick: handleClickDetails,
    },
    {
      variant: 'destructive',
      label: 'Delete',
      onClick: () =>
        emit('@cloud-projects/project--delete', {
          id,
          name: name ?? String(id),
        }),
    },
  ];

  const ownershipStatus = [
    !!teamName && { icon: BuildingIcon, text: teamName },
    !!ownerName && { icon: UserIcon, text: ownerName },
  ].filter(Boolean) as { icon: typeof UserIcon; text: string }[];

  return (
    <ResourceCard.Compact>
      <ResourceCard.Compact.Main>
        <button
          type="button"
          className="flex items-start gap-x-2 w-full text-left cursor-pointer"
          onClick={handleClickDetails}
        >
          <ResourceCard.Compact.Main.Hero
            image={heroImage}
            tooltipMessage={meta.label}
          />
          <ResourceCard.Compact.Main.Content
            title={name ?? undefined}
            status={[
              { icon: CloudIcon, text: meta.label },
              ...ownershipStatus,
            ]}
          />
        </button>
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
