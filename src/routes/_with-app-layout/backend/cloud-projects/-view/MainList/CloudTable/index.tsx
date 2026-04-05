import type { ComponentProps } from 'react';

import dayjs from 'dayjs';
import {
  BuildingIcon,
  CloudIcon,
  EyeIcon,
  UserIcon,
} from 'lucide-react';

import { useDevetekLocale } from '@/services/i18n';
import { getDistanceFromNow } from '@/shared/libs/browser/date';
import { Button } from '@/shared/presentation/atoms/ButtonV2';
import { Tooltip } from '@/shared/presentation/atoms/Tooltip';
import IconThreeDots from '@/shared/presentation/icons/ThreeDots';
import ActionPopover from '@/shared/presentation/molecules/ActionPopover';
import { buildResourceTable } from '@/widgets/resource-table';

import IconGoogleCloudPlatform from '@/shared/assets/ico-gcloud.png';
import IconIDCloudHost from '@/shared/assets/ico-idcloudhost.svg';
import IconProxmox from '@/shared/assets/ico-proxmox.png';

import { useEmit } from '../../../-model/events';

export interface CloudTableData {
  id: number;
  name?: string | null;
  provider?: string | null;
  ownerName?: string | null;
  teamName?: string | null;
  lastUpdated?: string | null;
  installerStatus?: string | null;
}

export interface CloudTableProps {
  data: CloudTableData[];
}

const PROVIDER_META: Record<
  string,
  { src?: string; label: string; icon?: React.ComponentType<{ className?: string }> }
> = {
  idcloudhost: { src: IconIDCloudHost, label: 'IDCloudHost' },
  gcp: { src: IconGoogleCloudPlatform, label: 'Google Cloud' },
  proxmox: { src: IconProxmox, label: 'Proxmox VE' },
};

const Table = buildResourceTable<CloudTableData>({
  columns: [
    {
      key: 'provider',
      width: '32px',
      header: (
        <div className="flex items-center justify-center w-8">
          <CloudIcon className="size-4 text-primary/70" />
        </div>
      ),
      content: ({ row }) => {
        const meta =
          PROVIDER_META[row.provider?.toLocaleLowerCase() ?? ''] ?? null;

        if (meta?.src) {
          return (
            <Tooltip message={meta.label}>
              <img src={meta.src} className="size-8 object-contain" alt={meta.label} />
            </Tooltip>
          );
        }

        return (
          <Tooltip message={row.provider ?? 'Unknown'}>
            <CloudIcon className="size-6 text-primary/60" />
          </Tooltip>
        );
      },
    },
    {
      key: 'name',
      width: '2fr',
      header: 'Cloud Project',
      content: function Content({ row }) {
        const emit = useEmit();
        const providerKey = row.provider?.toLocaleLowerCase() ?? '';
        const providerLabel = PROVIDER_META[providerKey]?.label ?? row.provider;

        return (
          <button
            type="button"
            className="leading-2.5 flex flex-col justify-center w-full text-left cursor-pointer"
            onClick={() =>
              emit('@cloud-projects/open--details', {
                cloudProjectId: String(row.id),
                cloudProjectName: row.name ?? '',
              })
            }
          >
            <p className="text-primary tracking-tight text-sm font-medium hover:underline">
              {row.name ?? '—'}
            </p>
            {providerLabel && (
              <em className="text-primary/70 text-[0.6rem]">{providerLabel}</em>
            )}
          </button>
        );
      },
    },
    {
      key: 'owner',
      width: '1.5fr',
      header: 'Owner',
      content: ({ row }) => (
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
              <span>part of</span>
              <BuildingIcon className="size-2.5 ml-1 mr-0.5" />
              <span>{row.teamName}</span>
            </p>
          )}
        </div>
      ),
    },
    {
      key: 'lastUpdated',
      header: 'Last Modified',
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

        type Actions = ComponentProps<typeof ActionPopover>['actions'];
        const actions: Actions = [
          {
            variant: 'danger',
            label: 'Delete',
            onClick: () => {
              emit('@cloud-projects/project--delete', {
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
                emit('@cloud-projects/open--details', {
                  cloudProjectId: String(row.id),
                  cloudProjectName: row.name ?? '',
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

export default function CloudTable(props: CloudTableProps) {
  const { data } = props;

  return (
    <div className="overflow-hidden overflow-x-auto -mt-1 pt-1 -mb-2 pb-2 -mx-2 px-2">
      <Table className="min-w-[560px]" data={data} />
    </div>
  );
}
