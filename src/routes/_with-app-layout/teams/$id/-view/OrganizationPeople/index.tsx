import { useRouter } from '@tanstack/react-router';
import { PlusCircleIcon } from 'lucide-react';

import { useDialog } from '@/services/dialog';
import { useToaster } from '@/services/toaster';

import { useOrganizationPeopleCreateModal } from '@/features/organization-people-create-modal';

import { ApiOrganizationPeople } from '@/shared/api';
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

import { useFilter } from '../../-model';
import { OrganizationPeopleAction } from '../../-presentation/OrganizationPeopleAction';

interface Props {
  orgID: string;
}

export default function OrganizationPeople({ orgID }: Props) {
  const router = useRouter();
  const [openToaster] = useToaster();
  const [openDialog] = useDialog();

  const [openOrganizationPeopleCreateModal] =
    useOrganizationPeopleCreateModal();
  const { pagination, setPagination } = useFilter();

  const [response, refresh] = ApiOrganizationPeople.Find.useGet({
    organizationId: orgID,
    page: pagination,
  });

  const handleClickDeleteOrganizationPeople = (id: string, name: string) => {
    return () => {
      openDialog({
        title: 'Delete member',
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
              await ApiOrganizationPeople.Delete.$Id.doDelete({
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
              router.invalidate();
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
              openOrganizationPeopleCreateModal({
                organization_id: orgID,
                onSubmitSuccess: () => {
                  router.invalidate();
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
          {response.org_peoples?.map((org) => {
            const { id, user = null } = org;
            const username = user?.username || '';

            if (!id) return null;

            return (
              <TableRow key={id}>
                <TableCell width={'70%'}>{user?.username}</TableCell>
                <TableCell width={'10%'}>
                  <OrganizationPeopleAction
                    onClickDelete={handleClickDeleteOrganizationPeople(
                      id,
                      username,
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
