import type { ComponentProps } from 'react';

import { MailIcon, UserIcon } from 'lucide-react';

import IconEye from '@/shared/presentation/icons/Eye';
import IconEyeActive from '@/shared/presentation/icons/EyeActive';
import IconLastDateActive from '@/shared/presentation/icons/LastDateActive';
import { ResourceCard } from '@/widgets/resource-card';

import { useEmit } from '../../../-model/events';
import type { MemberTableData } from '../MemberTable';

export interface MemberCardProps {
  data: MemberTableData;
}

export default function MemberCard(props: MemberCardProps) {
  const { data } = props;
  const { id, fullname, username, email, avatarUrl, joinedAt } = data;

  const emit = useEmit();

  const displayName = fullname || username || '—';

  type Actions = ComponentProps<typeof ResourceCard.Compact.Actions>['actions'];
  const actions: Actions = [
    {
      variant: 'destructive',
      label: 'Remove',
      onClick: () =>
        emit('@team-members/member--delete', {
          id,
          name: username ?? fullname ?? String(id),
        }),
    },
  ];

  const statusItems = [
    !!username && fullname && { icon: UserIcon, text: `@${username}` },
    !!email && { icon: MailIcon, text: email },
  ].filter(Boolean) as { icon: typeof UserIcon; text: string }[];

  return (
    <ResourceCard.Compact>
      <ResourceCard.Compact.Main>
        <div className="flex items-start gap-x-2 w-full text-left">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 shrink-0 mt-0.5 overflow-hidden">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={username ?? ''}
                className="size-8 object-cover"
              />
            ) : (
              <UserIcon className="size-4 text-primary/70" />
            )}
          </div>
          <ResourceCard.Compact.Main.Content
            title={displayName}
            status={statusItems}
          />
        </div>
      </ResourceCard.Compact.Main>
      <ResourceCard.Compact.Actions
        visibleActionOnlyIcon
        actions={actions}
        labelMore="More"
      />
      {joinedAt && (
        <ResourceCard.Compact.Footnote>
          <ResourceCard.Compact.Footnote.Item
            icon={IconLastDateActive}
            label="Joined"
            value={joinedAt}
          />
        </ResourceCard.Compact.Footnote>
      )}
    </ResourceCard.Compact>
  );
}
