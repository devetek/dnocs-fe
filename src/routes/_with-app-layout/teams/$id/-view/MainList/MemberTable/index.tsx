import type { ComponentProps } from 'react';

import dayjs from 'dayjs';
import { MailIcon, UserIcon } from 'lucide-react';

import { useDevetekLocale } from '@/services/i18n';
import { getDistanceFromNow } from '@/shared/libs/browser/date';
import { Button } from '@/shared/presentation/atoms/ButtonV2';
import IconThreeDots from '@/shared/presentation/icons/ThreeDots';
import ActionPopover from '@/shared/presentation/molecules/ActionPopover';
import { buildResourceTable } from '@/widgets/resource-table';

import { useEmit } from '../../../-model/events';

export interface MemberTableData {
  id: string;
  userId?: number | null;
  fullname?: string | null;
  username?: string | null;
  email?: string | null;
  avatarUrl?: string | null;
  joinedAt?: string | null;
}

export interface MemberTableProps {
  data: MemberTableData[];
}

const Table = buildResourceTable<MemberTableData>({
  columns: [
    {
      key: 'avatar',
      width: '32px',
      header: (
        <div className="flex items-center justify-center w-8">
          <UserIcon className="size-4 text-primary/70" />
        </div>
      ),
      content: ({ row }) => (
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 shrink-0">
          {row.avatarUrl ? (
            <img
              src={row.avatarUrl}
              alt={row.username ?? ''}
              className="size-8 rounded-full object-cover"
            />
          ) : (
            <UserIcon className="size-4 text-primary/70" />
          )}
        </div>
      ),
    },
    {
      key: 'name',
      width: '2fr',
      header: 'Member',
      content: ({ row }) => (
        <div className="flex flex-col justify-center">
          <p className="text-primary tracking-tight text-sm font-medium">
            {row.fullname || row.username || '—'}
          </p>
          {row.username && row.fullname && (
            <em className="text-primary/70 text-[0.6rem]">@{row.username}</em>
          )}
          {row.email && (
            <p className="text-primary/50 text-[0.6rem] flex items-center gap-0.5 mt-0.5">
              <MailIcon className="size-2.5" />
              {row.email}
            </p>
          )}
        </div>
      ),
    },
    {
      key: 'joinedAt',
      header: 'Joined',
      content: function Content({ row }) {
        const locale = useDevetekLocale();

        if (!row.joinedAt) {
          return <p className="text-primary/40 text-xs">—</p>;
        }

        const relative = getDistanceFromNow(row.joinedAt, locale);

        return (
          <div className="flex flex-col justify-center">
            <p className="text-primary text-sm">{relative}</p>
            <p className="text-primary/70 text-[0.6rem]">
              {dayjs(row.joinedAt).format('YYYY/MM/DD HH:mm')}
            </p>
          </div>
        );
      },
    },
    {
      key: 'actions',
      content: function Content({ row }) {
        const emit = useEmit();

        type Actions = ComponentProps<typeof ActionPopover>['actions'];
        const actions: Actions = [
          {
            variant: 'danger',
            label: 'Remove from team',
            onClick: () => {
              emit('@team-members/member--delete', {
                id: row.id,
                name: row.username ?? row.fullname ?? String(row.userId),
              });
            },
          },
        ];

        return (
          <div className="flex justify-end items-center gap-x-1">
            <ActionPopover actions={actions}>
              <Button size="icon-sm" buttonColor="secondary" buttonStyle="ghost">
                <IconThreeDots className="size-4" />
              </Button>
            </ActionPopover>
          </div>
        );
      },
    },
  ],
});

export default function MemberTable(props: MemberTableProps) {
  return <Table data={props.data} />;
}
