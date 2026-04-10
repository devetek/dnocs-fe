import type { ComponentProps } from 'react';

import { BuildingIcon, KeyRoundIcon, UserIcon } from 'lucide-react';

import { useDevetekTranslations } from '@/services/i18n';

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

  const t = useDevetekTranslations();

  const emit = useEmit();

  const handleClickDetails = () =>
    emit('@ssh-keys/open--details', {
      sshKeyId: id,
      sshKeyName: name ?? '',
    });

  type Actions = ComponentProps<typeof ResourceCard.Compact.Actions>['actions'];
  const actions: Actions = [
    {
      label: t('common.actions.details'),
      icon: IconEye,
      iconActive: IconEyeActive,
      onClick: handleClickDetails,
    },
    {
      label: t('common.actions.migrateOwnership'),
      onClick: () =>
        emit('@ssh-keys/open--migrate-ownership', {
          id,
          name: name ?? String(id),
          teamName,
        }),
    },
    {
      variant: 'destructive',
      label: t('common.actions.delete'),
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
            tooltipMessage={t('page.sshKeys.table.headers.key')}
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
        labelMore={t('common.actions.more')}
      />
      <ResourceCard.Compact.Footnote>
        <ResourceCard.Compact.Footnote.Item
          icon={IconLastDateActive}
          label={t('common.terms.lastUpdated')}
          value={lastUpdated ?? undefined}
        />
      </ResourceCard.Compact.Footnote>
    </ResourceCard.Compact>
  );
}
