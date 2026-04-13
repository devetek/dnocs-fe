import { useState } from 'react';

import { ChevronDownIcon, ChevronUpIcon, GlobeIcon } from 'lucide-react';

import { useDevetekTranslations } from '@/services/i18n';

import { ApiLoadBalancer } from '@/shared/api';
import { cn } from '@/shared/libs/tailwind/cn';
import Shimmer from '@/shared/presentation/atoms/Shimmer';

interface Props {
  applicationId: string;
}

export default function AppLoadBalancers({ applicationId }: Props) {
  const t = useDevetekTranslations();
  const [isExpanded, setIsExpanded] = useState(false);

  const [lbResponse] = ApiLoadBalancer.Find.useGet({
    applicationId,
    options: { skip: !isExpanded },
  });

  const isLoading =
    lbResponse.$status === 'initial' || lbResponse.$status === 'loading';

  const domains: string[] =
    lbResponse.$status === 'success'
      ? (lbResponse.routers ?? [])
          .map((lb) => lb.domain)
          .filter((d): d is string => !!d)
      : [];

  return (
    <div className="w-full border-t border-border/40">
      <button
        type="button"
        className={cn(
          'flex w-full items-center gap-x-2 px-3 py-1.5',
          'text-xs text-primary/60 hover:text-primary/80 transition-colors',
          'hover:bg-muted/30 cursor-pointer',
        )}
        onClick={() => setIsExpanded((prev) => !prev)}
      >
        <GlobeIcon className="size-3 shrink-0" />
        <span className="font-medium">
          {isExpanded
            ? t('page.applications.appCard.loadBalancers.collapse')
            : t('page.applications.appCard.loadBalancers.expand')}
        </span>
        {isExpanded ? (
          <ChevronUpIcon className="size-3 ml-auto shrink-0" />
        ) : (
          <ChevronDownIcon className="size-3 ml-auto shrink-0" />
        )}
      </button>

      {isExpanded && (
        <div className="px-3 pb-2 flex flex-wrap gap-x-4 gap-y-1">
          {isLoading && (
            <>
              <Shimmer className="h-4 w-32 rounded" />
              <Shimmer className="h-4 w-24 rounded" />
            </>
          )}
          {!isLoading && domains.length === 0 && (
            <p className="text-xs text-primary/40 italic">
              {t('page.applications.appCard.loadBalancers.emptyMessage')}
            </p>
          )}
          {!isLoading &&
            domains.map((domain) => (
              <a
                key={domain}
                href={domain.startsWith('http') ? domain : `https://${domain}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-xs text-primary/70 flex items-center gap-x-1 hover:underline hover:text-primary transition-colors"
              >
                <GlobeIcon className="size-3 shrink-0 text-primary/40" />
                {domain}
              </a>
            ))}
        </div>
      )}
    </div>
  );
}
