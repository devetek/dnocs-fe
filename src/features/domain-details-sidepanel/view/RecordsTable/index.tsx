import { EyeClosedIcon, EyeIcon, Trash2Icon } from 'lucide-react';

import { useDevetekTranslations } from '@/services/i18n';

import type { DnsRecord } from '@/entities/domain/rules/schema/parts';

import { humanizeSeconds } from '@/shared/libs/browser/date';
import { Button } from '@/shared/presentation/atoms/ButtonV2';
import { Spinner } from '@/shared/presentation/atoms/Spinner';
import { buildResourceTable } from '@/widgets/resource-table';
import { buildResponseView } from '@/widgets/response-view-builder';
import { buildPaginationV2 } from '@/widgets/ui-atomic-builder/atom-pagination-v2';

import { useDomainDetailsModel } from '../../models/domain-details';
import { useEmit } from '../../models/events';

const Table = buildResourceTable<DnsRecord>({
  contentWrapper: {
    component: ({ children }) => (
      <p className="text-primary text-sm line-clamp-1 break-all">{children}</p>
    ),
    excludedKeys: ['actions'],
  },
  rowAppend: function RowAppend({ row }) {
    const t = useDevetekTranslations('sidepanel.domainDetails.table');

    return (
      <div className="p-1 pt-0">
        <div className="bg-card border rounded-lg overflow-hidden">
          <p className="grid grid-cols-[1fr_4fr] border-b text-primary text-xs">
            <span className="font-bold p-2 bg-border/30 text-right">
              {t('type').toLocaleUpperCase()}
            </span>
            <span className="px-2 py-1.5 flex items-center gap-x-1">
              <span className="p-1 py-0.75 rounded-sm border text-xs text-primary font-semibold">
                {row.type}
              </span>

              <span className="p-1 py-0.75 rounded-sm border text-xs text-primary font-semibold">
                {t('ttl').toLocaleUpperCase()} {humanizeSeconds(row.ttl)}
              </span>
            </span>
          </p>

          <p className="grid grid-cols-[1fr_4fr] border-b text-primary text-xs">
            <span className="font-bold px-2 py-1.5 bg-border/30 text-right">
              {t('name').toLocaleUpperCase()}
            </span>
            <span className="px-2 py-1.5">{row.name}</span>
          </p>

          <p className="grid grid-cols-[1fr_4fr] border-b text-primary text-xs">
            <span className="font-bold px-2 py-1.5 bg-border/30 text-right">
              {t('content').toLocaleUpperCase()}
            </span>
            <span className="px-2 py-1.5">{row.content}</span>
          </p>

          <p className="grid grid-cols-[1fr_4fr] border-b text-primary text-xs">
            <span className="font-bold px-2 py-1.5 bg-border/30 text-right">
              {t('comments').toLocaleUpperCase()}
            </span>
            <span className="px-2 py-1.5">{row.comment}</span>
          </p>
        </div>
      </div>
    );
  },
  columns: [
    {
      key: 'type',
      width: '0.5fr',
      header: '@sidepanel.domainDetails.table.type',
      content: ({ row }) => row.type,
    },
    {
      key: 'name',
      width: '2fr',
      header: '@sidepanel.domainDetails.table.name',
      content: ({ row }) => row.name,
    },
    {
      key: 'content',
      width: '2fr',
      header: '@sidepanel.domainDetails.table.content',
      content: ({ row }) => row.content,
    },
    {
      key: 'ttl',
      width: '1fr',
      header: '@sidepanel.domainDetails.table.ttl',
      content: ({ row }) => row.ttl,
    },
    {
      key: 'actions',
      width: '1fr',
      content: function Actions(props) {
        const { row, showAppend, onViewAppend } = props;

        const emit = useEmit();

        const [domainId] = useDomainDetailsModel((s) => [s.domainId]);

        const handleClickShowMore = () => {
          onViewAppend();
        };

        const handleClickTrash = () => {
          emit('#domain-details-sidepanel/dns-record--delete', [domainId, row]);
        };

        return (
          <div className="flex items-center gap-x-1">
            <Button
              size="xs"
              buttonColor="secondary"
              onClick={handleClickShowMore}
            >
              {showAppend ? <EyeClosedIcon /> : <EyeIcon />}
            </Button>
            <Button
              size="xs"
              buttonColor="secondary"
              onClick={handleClickTrash}
            >
              <Trash2Icon className="text-red-500" />
            </Button>
          </div>
        );
      },
    },
  ],
});

const Pagination = buildPaginationV2({});

export default buildResponseView({
  useResponse: () => useDomainDetailsModel((s) => s.details),
  fallbackLoading: () => <Spinner />,
  fallbackError: (error) => <>{JSON.stringify(error)}</>,
  render: function Render({ dnsRecords, pagination }) {
    const emit = useEmit();

    const handleClickNextPage = () => {
      emit('#domain-details-sidepanel/details/next-page');
    };

    const handleClickPrevPage = () => {
      emit('#domain-details-sidepanel/details/prev-page');
    };

    const handleClickToPage = (newPage: number) => {
      emit('#domain-details-sidepanel/details/to-page', newPage);
    };

    return (
      <div className="flex flex-col gap-y-4">
        <div className="flex flex-col w-full gap-y-1">
          <h5 className="text-xs font-bold text-primary">RECORDS</h5>

          <Table className="min-w-[600px]" data={dnsRecords} size="sm" />
        </div>

        <div className="flex flex-row-reverse">
          <Pagination
            currentPage={pagination.current}
            totalPage={pagination.totalPage}
            onClickForward={handleClickNextPage}
            onClickBack={handleClickPrevPage}
            onPageChange={handleClickToPage}
          />
        </div>
      </div>
    );
  },
});
