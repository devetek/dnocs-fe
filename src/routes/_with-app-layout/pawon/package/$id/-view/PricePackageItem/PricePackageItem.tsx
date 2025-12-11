import { useParams } from '@tanstack/react-router';
import { PlusCircleIcon } from 'lucide-react';

import { useDialog } from '@/services/dialog';
import { useToaster } from '@/services/toaster';

import { usePricePackageItemCreateModal } from '@/features/price-package-item-create-modal';

import { ApiPricePackageItem } from '@/shared/api';
import { Button } from '@/shared/presentation/atoms/Button';
import { Pagination } from '@/shared/presentation/atoms/Pagination';
import { Spinner } from '@/shared/presentation/atoms/Spinner';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/presentation/atoms/Table';
import { FailedState } from '@/widgets/failed-state';

import { useFilter } from '../../-model/filter';
import { PricePackageItemAction } from '../../-presentation/PricePackageItemAction';

export default function PricePackageItems() {
  const { id } = useParams({ from: '/_with-app-layout/pawon/package/$id/' });

  const [openToaster] = useToaster();
  const [openDialog] = useDialog();

  const [openPricePackageItemCreateModal] = usePricePackageItemCreateModal();
  const { pagination, setPagination } = useFilter();

  const [response, refresh] = ApiPricePackageItem.Find.useGet({
    pricePackageID: id,
    page: pagination,
  });

  const handleClickDeletePricePackageItem = (
    targetId: string,
    name: string,
  ) => {
    return () => {
      openDialog({
        title: 'Delete Service',
        content: (
          <>
            Are you sure want to delete service <code>{name}</code> (
            <code>{targetId}</code>) <br />
            from this package?
          </>
        ),
        variant: 'warning',
        actions: {
          variant: 'YesNo',
          yes: async () => {
            const deleteResponse =
              await ApiPricePackageItem.Delete.$Id.doDelete({
                id: targetId,
              });

            if (deleteResponse.$status === 'success') {
              openToaster({
                variant: 'success',
                message: (
                  <>
                    Successfully deleted <code>{name}</code> (
                    <code>{targetId}</code>)
                  </>
                ),
              });
              refresh();
              return;
            }

            openToaster({
              variant: 'error',
              title: (
                <>
                  Failed to delete <code>{name}</code> (<code>{id}</code>)
                </>
              ),
              message: deleteResponse.error.message,
            });
          },
        },
      });
    };
  };

  if (response.$status === 'failed') {
    return <FailedState.WallCentered errorPayload={response.error.message} />;
  }

  if (response.$status !== 'success') {
    return (
      <div className="w-full flex justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-between items-center gap-2">
        <div className="flex flex-row items-center gap-2">
          <Button
            variant="secondary"
            onClick={() => {
              openPricePackageItemCreateModal({
                onSubmitSuccess: () => {
                  refresh();
                },
              });
            }}
          >
            Add <PlusCircleIcon className="size-4" />
          </Button>
        </div>
        <div>
          <Pagination
            currentPage={pagination}
            maxPage={response.pagination.total_page}
            onPageChange={(newPage) => setPagination(newPage)}
          />
        </div>
      </div>
      <br />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Service</TableHead>
            <TableHead>Limit</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {response.price_package_items?.map((pricePackageItem) => {
            const { id: ppiId, price_name, limit } = pricePackageItem;

            if (!ppiId) return null;

            return (
              <TableRow key={ppiId}>
                <TableCell width={'50%'}>{price_name.name}</TableCell>
                <TableCell width={'40%'}>{limit}</TableCell>
                <TableCell width={'10%'}>
                  <PricePackageItemAction
                    onClickDelete={handleClickDeletePricePackageItem(
                      ppiId,
                      price_name.name ?? '',
                    )}
                  />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
}
