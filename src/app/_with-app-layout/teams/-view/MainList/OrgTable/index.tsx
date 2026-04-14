import type { ComponentProps } from 'react';

import dayjs from 'dayjs';
import { CalendarIcon, UsersIcon } from 'lucide-react';

import { useDevetekLocale, useDevetekTranslations } from '@/services/i18n';
import { getDistanceFromNow } from '@/shared/libs/browser/date';
import { Button } from '@/shared/presentation/atoms/ButtonV2';
import IconThreeDots from '@/shared/presentation/icons/ThreeDots';
import ActionPopover from '@/shared/presentation/molecules/ActionPopover';
import { buildResourceTable } from '@/widgets/resource-table';

import { useEmit } from '../../../-model/events';

export interface OrgTableData {
  id: string;
  name?: string | null;
  description?: string | null;
  status?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
}

export interface OrgTableProps {
  data: OrgTableData[];
}

const Table = buildResourceTable<OrgTableData>({
  columns: [
    {
      key: 'icon',
      width: '32px',
      header: (
        <div className="flex items-center justify-center w-8">
          <UsersIcon className="size-4 text-primary/70" />
        </div>
      ),
      content: () => (
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10">
          <UsersIcon className="size-4 text-primary/70" />
        </div>
      ),
    },
    {
      key: 'name',
      width: '2fr',
      header: '@common.terms.team',
      content: function Content({ row }) {
        const emit = useEmit();

        return (
          <button
            type="button"
            className="leading-2.5 flex flex-col justify-center w-full text-left cursor-pointer"
            onClick={() =>
              emit('@teams/open--details', {
                orgId: row.id,
                orgName: row.name ?? '',
              })
            }
          >
            <p className="text-primary tracking-tight text-sm font-medium hover:underline">
              {row.name ?? '—'}
            </p>
            {row.description && (
              <em className="text-primary/70 text-[0.6rem] line-clamp-1">
                {row.description}
              </em>
            )}
          </button>
        );
      },
    },
    {
      key: 'updatedAt',
      header: '@common.terms.lastUpdated',
      content: function Content({ row }) {
        const locale = useDevetekLocale();

        if (!row.updatedAt) {
          return <p className="text-primary/40 text-xs">—</p>;
        }

        const relative = getDistanceFromNow(row.updatedAt, locale);

        return (
          <div className="flex flex-col justify-center">
            <p className="text-primary text-sm">{relative}</p>
            <p className="text-primary/70 text-[0.6rem]">
              {dayjs(row.updatedAt).format('YYYY/MM/DD HH:mm')}
            </p>
          </div>
        );
      },
    },
    {
      key: 'actions',
      content: function Content({ row }) {
        const emit = useEmit();
        const t = useDevetekTranslations();

        type Actions = ComponentProps<typeof ActionPopover>['actions'];
        const actions: Actions = [
          {
            label: t('common.actions.details'),
            onClick: () => {
              emit('@teams/open--details', {
                orgId: row.id,
                orgName: row.name ?? String(row.id),
              });
            },
          },
          {
            variant: 'danger',
            label: t('common.actions.delete'),
            onClick: () => {
              emit('@teams/org--delete', {
                id: row.id,
                name: row.name ?? String(row.id),
              });
            },
          },
        ];

        return (
          <div className="flex justify-end items-center gap-x-1">
            <Button
              size="icon-sm"
              buttonColor="secondary"
              buttonStyle="ghost"
              onClick={() => {
                emit('@teams/open--details', {
                  orgId: row.id,
                  orgName: row.name ?? '',
                });
              }}
            >
              <CalendarIcon className="size-4" />
            </Button>

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

export default function OrgTable(props: OrgTableProps) {
  return <Table data={props.data} />;
}
