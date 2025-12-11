import { useNavigate } from '@tanstack/react-router';
import { PlusCircleIcon } from 'lucide-react';

import { useAuthLoggedIn } from '@/services/auth';
import { useDialog } from '@/services/dialog';
import { useToaster } from '@/services/toaster';

import { useOrganizationCreateModal } from '@/features/organization-create-modal';

import { ApiOrganization } from '@/shared/api';
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
import { OrganizationAction } from '../../-presentation/OrganizationAction';

export default function Organizations() {
  const userId = useAuthLoggedIn().userProfile.id;
  const [openToaster] = useToaster();
  const [openDialog] = useDialog();
  const navigate = useNavigate();

  const [openOrganizationCreateModal] = useOrganizationCreateModal();
  const { searchQuery, pagination, setPagination } = useFilter();

  const [response, refresh] = ApiOrganization.Find.useGet({
    name: searchQuery,
    userId,
    page: pagination,
  });

  const handleClickOrganizationDetails = (orgID: string) => {
    return () =>
      navigate({
        to: '/teams/$id',
        params: {
          id: orgID,
        },
      });
  };

  const handleClickDeleteOrganization = (id: string, name: string) => {
    return () => {
      openDialog({
        title: 'Delete Organization',
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
            const deleteResponse = await ApiOrganization.Delete.$Id.doDelete({
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
              openOrganizationCreateModal({
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
          {response.organizations?.map((org) => {
            const { id, name = '' } = org;

            if (!id) return null;

            return (
              <TableRow key={id}>
                <TableCell width={'70%'}>{name}</TableCell>
                <TableCell width={'10%'}>
                  <OrganizationAction
                    onCLickDetail={handleClickOrganizationDetails(id)}
                    onClickDelete={handleClickDeleteOrganization(id, name)}
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
