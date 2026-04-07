import type { ComponentProps } from 'react';

import { MailIcon, UserIcon } from 'lucide-react';

import { useDevetekLocale, useDevetekTranslations } from '@/services/i18n';

import { getDistanceFromNow } from '@/shared/libs/browser/date';
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
  const t = useDevetekTranslations();
  const locale = useDevetekLocale();

  const displayName = fullname || username || '—';
  const joinedAtRelative = joinedAt ? getDistanceFromNow(joinedAt, locale) : null;

  type Actions = ComponentProps<typeof ResourceCard.Compact.Actions>['actions'];
  const actions: Actions = [
    {
      variant: 'destructive',
      label: t('page.teamDetail.remove'),
      onClick: () =>
        emit('@team-members/member--delete', {
          id,
          name: username ?? fullname ?? String(id),
        }),
    },
  ];

  return (
    <ResourceCard.Compact>
      <ResourceCard.Compact.Main className="flex-col items-center text-center gap-y-2.5 pb-2">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 shrink-0 overflow-hidden ring-2 ring-primary/5">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={username ?? ''}
              className="size-12 object-cover"
            />
          ) : (
            <UserIcon className="size-6 text-primary/60" />
          )}
        </div>
        <div className="w-full flex flex-col items-center gap-0.5 overflow-hidden">
          <p className="font-semibold text-xs sm:text-sm break-all line-clamp-2 leading-snug w-full">
            {displayName}
          </p>
          {username && fullname && (
            <em className="text-primary/50 text-[0.6rem] not-italic">
              @{username}
            </em>
          )}
          {email && (
            <p className="text-primary/40 text-[0.6rem] flex items-center justify-center gap-0.5 mt-0.5 w-full">
              <MailIcon className="size-2.5 shrink-0" />
              <span className="truncate">{email}</span>
            </p>
          )}
        </div>
      </ResourceCard.Compact.Main>
      <ResourceCard.Compact.Actions
        visibleActionOnlyIcon
        actions={actions}
        labelMore={t('common.actions.more')}
      />
      {joinedAtRelative && (
        <ResourceCard.Compact.Footnote>
          <ResourceCard.Compact.Footnote.Item
            icon={IconLastDateActive}
            label={t('page.teamDetail.joinedLabel')}
            value={`${t('page.teamDetail.joinedDateLabel')}: ${joinedAtRelative}`}
          />
        </ResourceCard.Compact.Footnote>
      )}
    </ResourceCard.Compact>
  );
}
