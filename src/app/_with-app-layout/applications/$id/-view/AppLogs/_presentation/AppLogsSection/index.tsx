import type { ReactNode } from 'react';

import { ChevronsUpDownIcon, DownloadIcon } from 'lucide-react';

import { useDevetekTranslations } from '@/services/i18n';

import { cn } from '@/shared/libs/tailwind/cn';
import { Button } from '@/shared/presentation/atoms/Button';
import { Card } from '@/shared/presentation/atoms/Card';

interface AppLogsSectionProps {
  children?: ReactNode;
  selectedLogs?: string;
  ctaLogsDisabled?: boolean;

  onClickLogs?: () => void;
  onClickDownloadLog?: () => void;
}

export default function AppLogsSection(props: AppLogsSectionProps) {
  const { children, selectedLogs, ctaLogsDisabled, onClickDownloadLog, onClickLogs } = props;

  const t = useDevetekTranslations();

  return (
    <Card className="rounded-2xl">
      <div className="px-4 py-3 flex items-center justify-between gap-4">
        <div className="flex flex-col">
          <h3 className="text-xl font-bold">
            {t('page.applicationDetail.appLogs.title')}
          </h3>
          <h6 className="text-sm text-primary/70">
            {t('page.applicationDetail.appLogs.subtitle')}
          </h6>
        </div>

        <div className="flex items-center gap-1">
          {selectedLogs && (
            <Button variant="outline" onClick={onClickDownloadLog}>
              <DownloadIcon />
            </Button>
          )}

          <Button
            variant="outline"
            disabled={ctaLogsDisabled}
            className="min-w-30 max-w-40 flex overflow-hidden items-center justify-between gap-2"
            onClick={onClickLogs}
          >
            <p
              className={cn(
                'line-clamp-1 overflow-ellipsis',
                !selectedLogs && 'opacity-50',
              )}
            >
              {selectedLogs || 'Log'}
            </p>

            <ChevronsUpDownIcon />
          </Button>
        </div>
      </div>

      {children}
    </Card>
  );
}
