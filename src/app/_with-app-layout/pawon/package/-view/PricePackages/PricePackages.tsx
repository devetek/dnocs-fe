import { useNavigate } from '@tanstack/react-router';
import { PlusCircleIcon } from 'lucide-react';

import { useDialog } from '@/services/dialog';
import { useToaster } from '@/services/toaster';

import { usePricePackageCreateModal } from '@/features/price-package-create-modal';

import { ApiPricePackage } from '@/shared/api';
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

export default function PricePackages() {
  const [openToaster] = useToaster();
  const [openDialog] = useDialog();
  const navigate = useNavigate();

  const [openPricePackageCreateModal] = usePricePackageCreateModal();
  const { searchQuery, pagination, setPagination } = useFilter();

  // const [deletePricePackage] = useDeletePricePackage();
  const [response, refresh] = ApiPricePackage.Find.useGet({
    packageName: searchQuery,
    page: pagination,
  });

  const handleClickDetailPricePackage = (id: string) => {
    return () =>
      navigate({
        to: '/pawon/package/$id',
        params: {
          id,
        },
      });
  };

  const handleClickDeletePricePackage = (id: string, name: string) => {
    return () => {
      openDialog({
        title: 'Delete Package',
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
            const deleteResponse = await ApiPricePackage.Delete.$Id.doDelete({
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
              openPricePackageCreateModal({
                onSubmitSuccess: () => {
                  refresh();
                },
              });
            }}
          >
            Add <PlusCircleIcon width={16} height={16} />
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
            <TableHead>Name</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {response.price_packages?.map((PricePackage) => {
            const { id, name = '' } = PricePackage;

            if (!id) return null;

            return (
              <TableRow key={id}>
                <TableCell width={'70%'}>{name}</TableCell>
                <TableCell width={'10%'}>
                  <PricePackageAction
                    onCLickDetail={handleClickDetailPricePackage(id)}
                    onClickDelete={handleClickDeletePricePackage(id, name)}
                  />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      {/* </FlexGrid> */}
    </>
  );
}
