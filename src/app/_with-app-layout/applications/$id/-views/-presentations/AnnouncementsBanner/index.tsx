import { useMemo, useState } from 'react';

import { InfoIcon, TriangleAlertIcon } from 'lucide-react';

import { cn } from '@/shared/libs/tailwind/cn';
import { Button } from '@/shared/presentation/atoms/ButtonV2';
import { Card } from '@/shared/presentation/atoms/Card';
import { Spinner } from '@/shared/presentation/atoms/Spinner';

import type { Props } from './-types';

export type * as AnnouncementsBannerTypes from './-types';

export default function AnnouncementsBanner(props: Props) {
  const { announcements } = props;

  if (Array.isArray(announcements)) {
    throw Error('TODO: Multiple announcements are not supported yet');
  }

  const {
    accent = 'none',
    icon,
    title,
    description,
    ctaLabel,
    ctaOnClick,
  } = announcements;

  const [isCtaLoading, setIsCtaLoading] = useState(false);

  const handleCtaClick = async () => {
    if (ctaOnClick == null) return;

    setIsCtaLoading(true);

    try {
      await ctaOnClick();
    } finally {
      setIsCtaLoading(false);
    }
  };

  const BannerIcon = useMemo(() => {
    if (typeof icon !== 'string') return icon;

    switch (icon) {
      case 'info':
        return InfoIcon;

      case 'warning':
        return TriangleAlertIcon;

      default:
        return null;
    }
  }, [icon]);

  const cnWrapper = cn(
    'rounded-2xl',
    accent === 'none' ? 'border' : 'border-2',

    {
      'border-yellow-500':
        accent === 'warning-dashed' || accent === 'warning-solid',
      'border-dashed': accent === 'warning-dashed',
      'border-red-500': accent === 'critical',
    },
  );

  return (
    <Card className={cnWrapper}>
      <div className="p-4 grid grid-cols-[auto_1fr] gap-x-4">
        {BannerIcon != null && <BannerIcon className="w-10 h-10" />}

        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col">
            <h3 className="text-xl font-bold">{title}</h3>
            <h5 className="text-sm">{description}</h5>
          </div>

          {ctaLabel && (
            <Button
              className="w-max"
              onClick={handleCtaClick}
              disabled={isCtaLoading}
            >
              {isCtaLoading ? <Spinner /> : ctaLabel}
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
