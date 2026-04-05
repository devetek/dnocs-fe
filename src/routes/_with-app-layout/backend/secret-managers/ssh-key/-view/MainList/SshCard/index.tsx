import type { ComponentProps } from 'react';

import { BuildingIcon, KeyRoundIcon, UserIcon } from 'lucide-react';

import IconSSH from '@/shared/assets/ico-ssh.svg';
import IconEye from '@/shared/presentation/icons/Eye';
import IconEyeActive from '@/shared/presentation/icons/EyeActive';
import IconLastDateActive from '@/shared/presentation/icons/LastDateActive';
import { ResourceCard } from '@/widgets/resource-card';

import { useEmit } from '../../../-model/events';
import type { SshTableData } from '../SshTable';

export interface SshCardProps {
  data: SshTableData;
}

export default function SshCard(props: SshCardProps) {
  const { data } = props;
  const { id, name, type, lastUpdated, ownerName, teamName } = data;

  const emit = useEmit();

  const handleClickDetails = () =>
    emit('@ssh-keys/open--details', {
      sshKeyId: id,
      sshKeyName: name ?? '',
    });

  type Actions = ComponentProps<typeof ResourceCard.Compact.Actions>['actions'];
  const actions: Actions = [
    {
      label: 'Details',
      icon: IconEye,
      iconActive: IconEyeActive,
      onClick: handleClickDetails,
    },
    {
      variant: 'destructive',
      label: 'Delete',
      onClick: () =>
        emit('@ssh-keys/ssh-key--delete', {
          id,
          name: name ?? String(id),
        }),
    },
  ];

  const ownershipStatus = [
    !!teamName && { icon: BuildingIcon, text: teamName },
    !!ownerName && { icon: UserIcon, text: ownerName },
    !!type && { icon: KeyRoundIcon, text: type },
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
            image={IconSSH}
            tooltipMessage="SSH Key"
          />
          <ResourceCard.Compact.Main.Content
            title={name ?? undefined}
            status={ownershipStatus}
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
