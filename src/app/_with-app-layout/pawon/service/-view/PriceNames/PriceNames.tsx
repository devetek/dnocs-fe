import { PlusCircleIcon } from 'lucide-react';

import { useDialog } from '@/services/dialog';
import { useToaster } from '@/services/toaster';

import { usePriceNameCreateModal } from '@/features/price-name-create-modal';

import { ApiPriceName } from '@/shared/api';
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
import { PriceNameAction } from '../../-presentation/PriceNameAction';

export default function PriceNames() {
  const [openToaster] = useToaster();
  const [openDialog] = useDialog();

  const [openPriceNameCreateModal] = usePriceNameCreateModal();
  const { searchQuery, pagination, setPagination } = useFilter();

  const [response, refresh] = ApiPriceName.Find.useGet({
    name: searchQuery,
    page: pagination,
  });

  const handleClickDeletePriceName = (id: number, name: string) => {
    return () => {
      openDialog({
        title: 'Delete Price',
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
            const deleteResponse = await ApiPriceName.Delete.$Id.doDelete({
              id: String(id),
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
              openPriceNameCreateModal({
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
            <TableHead>Name</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {response.price_names?.map((priceName) => {
            const { id, name = '' } = priceName;

            if (!id) return null;

            return (
              <TableRow key={id}>
                <TableCell width={'70%'}>{name}</TableCell>
                <TableCell width={'10%'}>
                  <PriceNameAction
                    onClickDelete={handleClickDeletePriceName(id, name)}
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
