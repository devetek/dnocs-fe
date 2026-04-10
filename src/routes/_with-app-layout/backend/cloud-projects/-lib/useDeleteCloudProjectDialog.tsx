import { useDialog } from '@/services/dialog';
import { useDevetekTranslations } from '@/services/i18n';
import { useToaster } from '@/services/toaster';

import { ApiCloud } from '@/shared/api';

export default function useDeleteCloudProjectDialog(onSuccess: () => void) {
  const t = useDevetekTranslations();

  const [openToaster] = useToaster();
  const [openDialog] = useDialog();

  const handleClickDeleteCloudProject = (
    projectID: number,
    projectName: string,
  ) => {
    openDialog({
      title: t('page.cloudProjects.deleteDialog.title'),
      content: t('page.cloudProjects.deleteDialog.message', {
        name: projectName,
        id: projectID,
      }),
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
              message: t('page.cloudProjects.toaster.deleteSuccess', {
                name: projectName,
              }),
            });
            onSuccess();
            return;
          }

          openToaster({
            variant: 'error',
            title: t('page.cloudProjects.toaster.deleteError', {
              name: projectName,
            }),
            message: response.error.message,
          });
        },
      },
    });
  };

  return [handleClickDeleteCloudProject] as const;
}
