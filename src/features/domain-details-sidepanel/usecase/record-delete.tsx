import { z } from 'zod';

import { useDevetekTranslations } from '@/services/i18n';
import { useToaster } from '@/services/toaster';

import { ApiDomain } from '@/shared/api';
import buildDialog from '@/widgets/dialog-builder';

import { useEmit, useSubscribe } from '../models/events';

const useConfirmDeleteDialog = buildDialog({
  variant: 'warning',
  action: 'yesNo',
  title: '@dialog.domainRecordDelete.title',
  content: ({ t, recordName }) =>
    t('dialog.domainRecordDelete.message', {
      recordName,
    }),
  extraProps: z.object({
    recordName: z.string(),
  }),
  actionManualResolve: 'yes',
});

export default function useRecordDeleteUsecase() {
  const emit = useEmit();

  const t = useDevetekTranslations();

  const [openToaster] = useToaster();

  const [openDialogConfirmDelete] = useConfirmDeleteDialog();

  useSubscribe(
    '#domain-details-sidepanel/dns-record--delete',
    async ([domainId, record]) => {
      const { id: recordId, name: recordName } = record;

      const dialog = await openDialogConfirmDelete({
        recordName,
      });

      while (dialog.isUnresolved && dialog.response === 'yes') {
        const response = await ApiDomain.Delete.$Id.$RecordId.doDelete({
          id: domainId,
          recordId,
        });

        if (response.$status === 'success') {
          openToaster({
            variant: 'success',
            message: t('toaster.domainRecordDelete.success', {
              recordName,
            }),
          });

          dialog.resolve();
          emit('#domain-details-sidepanel/details/refresh');
          return;
        }

        openToaster({
          variant: 'error',
          title: t('toaster.domainRecordDelete.error', {
            recordName,
          }),
          message: response.error.message,
        });

        await dialog.reject(response.error);
      }
    },
  );
}
