import type { ReactNode } from 'react';

import { PlusCircleIcon } from 'lucide-react';

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

      <div className="p-4 pt-0 flex flex-col gap-2">{children}</div>
    </Card>
  );
}
