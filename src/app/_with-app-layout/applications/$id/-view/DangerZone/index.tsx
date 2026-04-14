import { Trash2Icon } from 'lucide-react';

import { useDevetekTranslations } from '@/services/i18n';

import { Button } from '@/shared/presentation/atoms/Button';
import { Card } from '@/shared/presentation/atoms/Card';

import { useAppDataModel } from '../../-model/app-data';
import { useEmit } from '../../-model/events';

export default function DangerZone() {
  const t = useDevetekTranslations();
  const emit = useEmit();

  const appData = useAppDataModel();
  const appDetail = appData.appDetail;

  if (appDetail.$status !== 'success') return null;

  const appId = appDetail.id;
  const appName = appDetail.identity.name;

  const handleDelete = () => {
    emit('@applications::detail/application-delete', {
      applicationId: appId,
      applicationName: appName,
    });
  };

  return (
    <Card className="border-red-500/20 overflow-hidden">
      <div className="px-4 py-3 border-b border-red-500/20 bg-red-500/5">
        <p className="text-sm font-semibold text-red-500">
          {t('page.applicationDetail.dangerZone.title')}
        </p>
      </div>
      <div className="p-4 flex items-center justify-between gap-4">
        <div className="flex flex-col gap-0.5">
          <p className="text-sm font-medium">
            {t('page.applicationDetail.dangerZone.deleteThisApp')}
          </p>
          <p className="text-xs text-primary/50">
            {t('page.applicationDetail.dangerZone.deleteThisAppDescription')}
          </p>
        </div>
        <Button
          variant="destructive"
          size="sm"
          className="shrink-0"
          onClick={handleDelete}
        >
          <Trash2Icon className="w-4 h-4 mr-1.5" />
          {t('page.applicationDetail.dangerZone.deleteThisApp')}
        </Button>
      </div>
    </Card>
  );
}
