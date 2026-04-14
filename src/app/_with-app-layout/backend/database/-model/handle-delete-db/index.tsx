import { useDialog } from '@/services/dialog';
import { useDevetekTranslations } from '@/services/i18n';
import { useToaster } from '@/services/toaster';

import { ApiDatabase } from '@/shared/api';

export default function useHandleDeleteDB(onSuccess: () => void) {
  const t = useDevetekTranslations();

  const [openToaster] = useToaster();
  const [openDialog] = useDialog();

  const handleDeleteDB = (dbId: number, dbName: string) => {
    return () => {
      openDialog({
        title: t('dialog.databaseDelete.title'),
        content: (
          <>
            {t.rich('dialog.databaseDelete.message', {
              code: (chunks) => <code>{chunks}</code>,
              databaseName: dbName,
            })}
          </>
        ),
        variant: 'warning',
        actions: {
          variant: 'YesNo',
          yes: async () => {
            const response = await ApiDatabase.Delete.doDelete({
              id: String(dbId),
            });

            if (response.$status === 'success') {
              openToaster({
                variant: 'success',
                message: t.rich('toaster.databaseDelete.success', {
                  code: (chunks) => <code>{chunks}</code>,
                  databaseName: dbName,
                }),
              });

              onSuccess();
              return;
            }

            openToaster({
              variant: 'error',
              title: t.rich('toaster.databaseDelete.error', {
                code: (chunks) => <code>{chunks}</code>,
                databaseName: dbName,
              }),
              message: response.error.message,
            });
          },
        },
      });
    };
  };

  return {
    handleDeleteDB,
  };
}
