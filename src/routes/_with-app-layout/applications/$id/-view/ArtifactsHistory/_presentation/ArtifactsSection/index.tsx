import type { ReactNode } from 'react';

import { PlusCircleIcon, TriangleAlertIcon } from 'lucide-react';

import { useDevetekTranslations } from '@/services/i18n';

import { Button } from '@/shared/presentation/atoms/Button';
import { Card } from '@/shared/presentation/atoms/Card';
import { Spinner } from '@/shared/presentation/atoms/Spinner';

interface ArtifactsSectionProps {
  ctaNewState?: 'loading' | 'disabled';
  ctaNewOnClick: () => void;

  children: ReactNode;
}

export default function ArtifactsSection(props: ArtifactsSectionProps) {
  const { ctaNewState, ctaNewOnClick, children } = props;

  const t = useDevetekTranslations();

  return (
    <Card className="rounded-2xl">
      <div className="px-4 py-3 flex items-center justify-end gap-4">

        <div className="flex items-center gap-2">
          <Button
            disabled={!!ctaNewState}
            variant="outline"
            size="sm"
            onClick={ctaNewOnClick}
          >
            {ctaNewState === 'loading' ? (
              <>
                <Spinner />
              </>
            ) : (
              <>
                <PlusCircleIcon className="w-4 h-4" />
                New Artifact
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="px-4 pb-2">
        <div className="flex items-start gap-2 rounded-md border border-yellow-400/50 bg-yellow-50 dark:bg-yellow-950/30 px-3 py-2 text-yellow-800 dark:text-yellow-300">
          <TriangleAlertIcon className="size-4 shrink-0 mt-0.5" />
          <p className="text-xs leading-relaxed">
            {t('page.applicationDetail.artifactsHistory.distributedStorageWarning')}
          </p>
        </div>
      </div>

      <div className="p-4 pt-2 flex flex-col gap-2">{children}</div>
    </Card>
  );
}
