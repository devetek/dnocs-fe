import type { ComponentProps } from 'react';

import { UsersIcon } from 'lucide-react';

import IconEye from '@/shared/presentation/icons/Eye';
import IconEyeActive from '@/shared/presentation/icons/EyeActive';
import IconLastDateActive from '@/shared/presentation/icons/LastDateActive';
import { ResourceCard } from '@/widgets/resource-card';

import { useEmit } from '../../../-model/events';
import type { OrgTableData } from '../OrgTable';

export interface OrgCardProps {
  data: OrgTableData;
}

export default function OrgCard(props: OrgCardProps) {
  const { data } = props;
  const { id, name, description, updatedAt } = data;

  const emit = useEmit();

  const handleClickDetails = () =>
    emit('@teams/open--details', {
      orgId: id,
      orgName: name ?? '',
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
        emit('@teams/org--delete', {
          id,
          name: name ?? String(id),
        }),
    },
  ];

  const statusItems = [
    !!description && { icon: UsersIcon, text: description },
  ].filter(Boolean) as { icon: typeof UsersIcon; text: string }[];

  return (
    <ResourceCard.Compact>
      <ResourceCard.Compact.Main>
        <button
          type="button"
          className="flex items-start gap-x-2 w-full text-left cursor-pointer"
          onClick={handleClickDetails}
        >
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 shrink-0 mt-0.5">
            <UsersIcon className="size-4 text-primary/70" />
          </div>
          <ResourceCard.Compact.Main.Content
            title={name ?? undefined}
            status={statusItems}
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
          value={updatedAt ?? undefined}
        />
      </ResourceCard.Compact.Footnote>
    </ResourceCard.Compact>
  );
}
