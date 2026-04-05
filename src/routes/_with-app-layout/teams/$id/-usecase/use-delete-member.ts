import { useDialog } from '@/services/dialog';
import { useToaster } from '@/services/toaster';

import { ApiOrganizationPeople } from '@/shared/api';
import useHandler from '@/shared/libs/react-hooks/useHandler';

import type { MemberDeletePayload as Payload } from '../-rules/usecase-types';

interface Params {
  onSuccess: () => void;
}

export default function useDeleteMemberUsecase(params: Params) {
  const { onSuccess } = params;

  const [openToaster] = useToaster();
  const [openDialog] = useDialog();

  const handleUsecase = useHandler((payload: Payload) => {
    const { id, name } = payload;

    openDialog({
      title: 'Remove Member',
      content: `Are you sure you want to remove "${name}" from this team?`,
      variant: 'warning',
      actions: {
        variant: 'YesNo',
        yes: async () => {
          const response = await ApiOrganizationPeople.Delete.$Id.doDelete({
            id,
          });

          if (response.$status === 'success') {
            openToaster({
              variant: 'success',
              message: `Successfully removed "${name}" from the team`,
            });
            onSuccess();
          } else {
            openToaster({
              variant: 'error',
              message: `Failed to remove "${name}" from the team`,
            });
          }
        },
      },
    });
  });

  return [handleUsecase] as const;
}
