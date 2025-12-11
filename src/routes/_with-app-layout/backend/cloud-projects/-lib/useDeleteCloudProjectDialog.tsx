import { useDialog } from '@/services/dialog';
import { useToaster } from '@/services/toaster';

import { ApiCloud } from '@/shared/api';

export default function useDeleteCloudProjectDialog(onSuccess: () => void) {
  const [openToaster] = useToaster();
  const [openDialog] = useDialog();

  const handleClickDeleteCloudProject = (
    projectID: number,
    projectName: string,
  ) => {
    openDialog({
      title: 'Delete Cloud Project',
      content: (
        <>
          Are you sure you want to delete <br />
          <code>{projectName}</code> (<code>{projectID}</code>)?
        </>
      ),
      variant: 'warning',
      actions: {
        variant: 'YesNo',
        yes: async () => {
          const response = await ApiCloud.Project.Delete.$Id.doDelete({
            id: String(projectID),
          });

          if (response.$status === 'success') {
            openToaster({
              variant: 'success',
              message: (
                <>
                  Successfully deleted cloud project <code>{projectName}</code>{' '}
                  (<code>{projectID}</code>)
                </>
              ),
            });
            onSuccess();
            return;
          }

          openToaster({
            variant: 'error',
            title: (
              <>
                Failed to delete cloud project <code>{projectName}</code> (
                <code>{projectID}</code>)
              </>
            ),
            message: response.error.message,
          });
        },
      },
    });
  };

  return [handleClickDeleteCloudProject] as const;
}
