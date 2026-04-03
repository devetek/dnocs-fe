import type { ComponentProps } from 'react';

import { KeyRoundIcon } from 'lucide-react';

import IconSSH from '@/shared/assets/ico-ssh.svg';
import IconEye from '@/shared/presentation/icons/Eye';
import IconEyeActive from '@/shared/presentation/icons/EyeActive';
import IconLastDateActive from '@/shared/presentation/icons/LastDateActive';
import { ResourceCard } from '@/widgets/resource-card';

export interface SshCardData {
  name?: string | null;
  type?: string | null;
  lastUpdated?: string | null;
}

export interface SshCardProps {
  data: SshCardData;
  variant: 'compact' | 'full';
  onClickDetails: () => void;
  onClickDelete: () => void;
}

export default function SshCard(props: SshCardProps) {
  const { data, variant, onClickDetails, onClickDelete } = props;
  const { name, type, lastUpdated } = data;

  type FullActions = ComponentProps<typeof ResourceCard.Full.Actions>['actions'];
  const actions: FullActions = [
    {
      label: 'Details',
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
            image={IconSSH}
            tooltipMessage="SSH Key"
          />
          <ResourceCard.Compact.Main.Content
            title={name ?? undefined}
            status={[
              !!type && { icon: KeyRoundIcon, text: type },
            ]}
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
          image={IconSSH}
          tooltipMessage="SSH Key"
        />
        <ResourceCard.Full.Main.Content
          title={name ?? undefined}
          status={[
            !!type && { icon: KeyRoundIcon, text: type },
          ]}
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
