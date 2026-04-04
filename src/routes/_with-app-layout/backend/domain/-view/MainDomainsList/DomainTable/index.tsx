import type { ComponentProps } from 'react';

import dayjs from 'dayjs';
import {
  BuildingIcon,
  CheckCircleIcon,
  ClockIcon,
  CloudIcon,
  EyeIcon,
  Settings2Icon,
  ShieldCheckIcon,
} from 'lucide-react';

import { useDevetekLocale, useDevetekTranslations } from '@/services/i18n';

import { DOMAIN_PROVIDER_BRANDS } from '@/entities/domain/ui/constants/provider';

import { getDistanceFromNow } from '@/shared/libs/browser/date';
import '@/shared/libs/browser/fn-extensions';
import { Button } from '@/shared/presentation/atoms/ButtonV2';
import { Tooltip } from '@/shared/presentation/atoms/Tooltip';
import IconThreeDots from '@/shared/presentation/icons/ThreeDots';
import ActionPopover from '@/shared/presentation/molecules/ActionPopover';
import { buildResourceTable } from '@/widgets/resource-table';

import { useEmit } from '../../../-models/events';

import type { DomainTableData, DomainTableProps as Props } from './types';

const Table = buildResourceTable<DomainTableData>({
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
        const ProviderIcon = DOMAIN_PROVIDER_BRANDS[row.provider].icon;

        return <ProviderIcon className="size-8" />;
      },
    },
    {
      key: 'domain',
      width: '2fr',
      header: '@page.domain.table.headers.domain',
      content: ({ row }) => (
        <div className="leading-2.5 flex flex-col justify-center">
          <pre className="text-primary tracking-tight text-sm">
            *.{row.domain.hostname}
          </pre>
          {row.description && (
            <em className="text-primary/70 text-[0.6rem]">{row.description}</em>
          )}
        </div>
      ),
    },
    {
      key: 'config',
      width: '36px',
      header: (
        <div className="flex flex-row-reverse">
          <div className="flex items-center justify-center w-8">
            <Settings2Icon className="size-4 text-primary/70" />
          </div>
        </div>
      ),
      content: () => (
        <div className="flex items-center gap-x-1">
          <Tooltip message="Ready">
            <CheckCircleIcon className="size-4 text-primary" />
          </Tooltip>
          <Tooltip message="SSL">
            <ShieldCheckIcon className="size-4 text-primary" />
          </Tooltip>
        </div>
      ),
    },
    {
      key: 'owner',
      width: '1.5fr',
      header: '@page.domain.table.headers.owner',
      content: ({ row }) => (
        <div className="flex flex-col justify-center">
          <p className="text-primary text-xs">{row.ownership.owner}</p>
          {row.ownership.team && (
            <p className="text-primary/70 text-[0.675rem] flex items-center">
              <span>part of</span>
              <BuildingIcon className="size-2.5 ml-1 mr-0.5" />
              <span>{row.ownership.team}</span>
            </p>
          )}
        </div>
      ),
    },
    {
      key: 'lastModified',
      header: '@page.domain.table.headers.lastModified',
      content: function Content({ row }) {
        const locale = useDevetekLocale();

        const lastUpdated = getDistanceFromNow(row.timestamp.updated, locale);

        return (
          <div className="flex flex-col justify-center">
            <p className="text-primary text-sm">{lastUpdated}</p>
            <p className="text-primary/70 text-[0.6rem] flex flex-wrap items-center">
              <ClockIcon className="size-2.5 mr-0.5" />
              <span>
                {dayjs(row.timestamp.updated).format('YYYY/MM/DD HH:mm')}
              </span>
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
              emit('@domain-dns/open--migrate-ownership', row);
            },
            disabled: true,
          },
          {
            variant: 'danger',
            label: t('common.actions.delete'),
            onClick: () => {
              emit('@domain-dns/domain--delete', row);
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
                emit('@domain-dns/open--details', row.id);
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

export default function DomainTable(props: Props) {
  const { data } = props;

  return (
    <div className="overflow-hidden overflow-x-auto -mt-1 pt-1 -mb-2 pb-2 -mx-2 px-2">
      <Table data={data} />
    </div>
  );
}
