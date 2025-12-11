import { PlusCircleIcon } from 'lucide-react';

import { useDialog } from '@/services/dialog';
import { useToaster } from '@/services/toaster';

import { usePricePackageConsumerCreateModal } from '@/features/price-package-consumer-create-modal';

import { ApiPricePackageConsumer } from '@/shared/api';
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
import { PricePackageAction } from '../../-presentation/PricePackageAction';

export default function PricePackageConsumers() {
  const [openToaster] = useToaster();
  const [openDialog] = useDialog();

  const [openPricePackageConsumerCreateModal] =
    usePricePackageConsumerCreateModal();
  const { pagination, setPagination } = useFilter();

  const [response, refresh] = ApiPricePackageConsumer.Find.useGet({
    page: pagination,
  });

  const handleClickPayPricePackage = (paymentLink: string) => {
    return () => {
      window.open(paymentLink, '_blank');
    };
  };

  const handleClickDeletePricePackage = (id: string, name: string) => {
    return () => {
      openDialog({
        title: 'Delete Payment',
        content: (
          <>
            Are you sure you want to delete <br />
            <code>{name}</code> (<code>{id}</code>)?
          </>
        ),
        variant: 'warning',
        actions: {
          variant: 'YesNo',
          yes: async () => {
            const deleteResponse =
              await ApiPricePackageConsumer.Delete.$Id.doDelete({
                id,
              });

            if (deleteResponse.$status === 'success') {
              openToaster({
                variant: 'success',
                message: (
                  <>
                    Successfully deleted <code>{name}</code> (<code>{id}</code>)
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
              openPricePackageConsumerCreateModal({
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
            <TableHead>Order ID</TableHead>
            <TableHead>Package</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Team</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {response.price_package_consumers?.map((PricePackageConsumer) => {
            const {
              id,
              price_package,
              user,
              organization,
              payment_status = 'unknown',
              payment_token,
              payment_data,
            } = PricePackageConsumer;

            if (!id) return null;

            return (
              <TableRow key={id}>
                <TableCell width={'10%'}>
                  {payment_data?.order_id || ''}
                </TableCell>
                <TableCell width={'20%'}>{price_package.name || ''}</TableCell>
                <TableCell width={'20%'}>{user.username}</TableCell>
                <TableCell width={'20%'}>{organization?.name || ''}</TableCell>
                <TableCell width={'30%'}>{payment_status}</TableCell>
                <TableCell width={'10%'}>
                  <PricePackageAction
                    onClickPay={handleClickPayPricePackage(
                      payment_token?.redirect_url ?? '',
                    )}
                    onClickDelete={handleClickDeletePricePackage(
                      id,
                      price_package.name || '',
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
