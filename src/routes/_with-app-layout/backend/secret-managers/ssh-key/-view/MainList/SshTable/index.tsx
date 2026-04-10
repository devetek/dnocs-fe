import type { ComponentProps } from 'react';

import dayjs from 'dayjs';
import { BuildingIcon, EyeIcon, KeyIcon, UserIcon } from 'lucide-react';

import { useDevetekLocale, useDevetekTranslations } from '@/services/i18n';
import { getDistanceFromNow } from '@/shared/libs/browser/date';
import { Button } from '@/shared/presentation/atoms/ButtonV2';
import { Tooltip } from '@/shared/presentation/atoms/Tooltip';
import IconSSH from '@/shared/assets/ico-ssh.svg';
import IconThreeDots from '@/shared/presentation/icons/ThreeDots';
import ActionPopover from '@/shared/presentation/molecules/ActionPopover';
import { buildResourceTable } from '@/widgets/resource-table';

import { useEmit } from '../../../-model/events';

export interface SshTableData {
  id: number;
  name?: string | null;
  type?: string | null;
  ownerName?: string | null;
  teamName?: string | null;
  lastUpdated?: string | null;
}

export interface SshTableProps {
  data: SshTableData[];
}

const Table = buildResourceTable<SshTableData>({
  columns: [
    {
      key: 'type',
      width: '32px',
      header: (
        <div className="flex items-center justify-center w-8">
          <KeyIcon className="size-4 text-primary/70" />
        </div>
      ),
      content: ({ row }) => (
        <Tooltip message={row.type ?? 'SSH'}>
          <img src={IconSSH} className="size-8 object-contain" alt="SSH" />
        </Tooltip>
      ),
    },
    {
      key: 'name',
      width: '2fr',
      header: '@page.sshKeys.table.headers.key',
      content: function Content({ row }) {
        const emit = useEmit();

        return (
          <button
            type="button"
            className="leading-2.5 flex flex-col justify-center w-full text-left cursor-pointer"
            onClick={() =>
              emit('@ssh-keys/open--details', {
                sshKeyId: row.id,
                sshKeyName: row.name ?? '',
              })
            }
          >
            <p className="text-primary tracking-tight text-sm font-medium hover:underline">
              {row.name ?? '—'}
            </p>
            {row.type && (
              <em className="text-primary/70 text-[0.6rem]">{row.type}</em>
            )}
          </button>
        );
      },
    },
    {
      key: 'owner',
      width: '1.5fr',
      header: '@page.sshKeys.table.headers.owner',
      content: function Content({ row }) {
        const t = useDevetekTranslations();

        return (
          <div className="flex flex-col justify-center">
            {row.ownerName ? (
              <p className="text-primary text-xs flex items-center gap-x-1">
                <UserIcon className="size-3 shrink-0" />
                {row.ownerName}
              </p>
            ) : (
              <p className="text-primary/40 text-xs">—</p>
            )}
            {row.teamName && (
              <p className="text-primary/70 text-[0.675rem] flex items-center mt-0.5">
                <span>{t('common.terms.partOf')}</span>
                <BuildingIcon className="size-2.5 ml-1 mr-0.5" />
                <span>{row.teamName}</span>
              </p>
            )}
          </div>
        );
      },
    },
    {
      key: 'lastUpdated',
      header: '@page.sshKeys.table.headers.lastModified',
      content: function Content({ row }) {
        const locale = useDevetekLocale();

        if (!row.lastUpdated) {
          return <p className="text-primary/40 text-xs">—</p>;
        }

        const relative = getDistanceFromNow(row.lastUpdated, locale);

        return (
          <div className="flex flex-col justify-center">
            <p className="text-primary text-sm">{relative}</p>
            <p className="text-primary/70 text-[0.6rem]">
              {dayjs(row.lastUpdated).format('YYYY/MM/DD HH:mm')}
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
            label: t('common.actions.migrateOwnership'),
            onClick: () => {
              emit('@ssh-keys/open--migrate-ownership', {
                id: row.id,
                name: row.name ?? String(row.id),
                teamName: row.teamName,
              });
            },
          },
          {
            variant: 'danger',
            label: t('common.actions.delete'),
            onClick: () => {
              emit('@ssh-keys/ssh-key--delete', {
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
                emit('@ssh-keys/open--details', {
                  sshKeyId: row.id,
                  sshKeyName: row.name ?? '',
                });
              }}
            >
              <EyeIcon />
            </Button>
            <ActionPopover actions={actions}>
              <Button
                size="icon-sm"
                buttonColor="secondary"
                buttonStyle="ghost"
              >
                <IconThreeDots />
              </Button>
            </ActionPopover>
          </div>
        );
      },
    },
  ],
});

export default function SshTable(props: SshTableProps) {
  const { data } = props;

  return (
    <div className="overflow-hidden overflow-x-auto -mt-1 pt-1 -mb-2 pb-2 -mx-2 px-2">
      <Table className="min-w-[560px]" data={data} />
    </div>
  );
}
