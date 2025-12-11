import type { ReactNode } from 'react';

import { PlusCircleIcon } from 'lucide-react';

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

  const t = useDevetekTranslations('page.applicationDetail.artifactsHistory');
  const tAll = useDevetekTranslations();

  return (
    <Card className="rounded-2xl">
      <div className="px-4 py-3 flex items-center justify-between gap-4">
        <div className="flex flex-col">
          <h3 className="text-xl font-bold">{t('title')}</h3>
          <h6 className="text-sm text-primary/70">{t('subtitle')}</h6>
        </div>

        <div className="flex items-center gap-2">
          <Button
            className="w-22"
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
                {tAll('common.actions.new')}
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="p-4 pt-0 flex flex-col gap-2">{children}</div>
    </Card>
  );
}
