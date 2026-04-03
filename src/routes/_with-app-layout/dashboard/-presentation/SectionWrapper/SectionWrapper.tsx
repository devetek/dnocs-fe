import type { ReactNode } from 'react';

import { Link } from '@tanstack/react-router';
import { ArrowRightIcon } from 'lucide-react';

interface Props {
  sectionTitle: string;
  count?: number;
  viewAllTo?: string;
  children: ReactNode;
}

export default function SectionWrapper(props: Props) {
  const { sectionTitle, count, viewAllTo, children } = props;

  return (
    <section className="flex flex-col gap-3">
      <div className="flex items-center justify-between px-1">
        <h6 className="text-primary font-bold flex items-center gap-2">
          {sectionTitle}
          {count !== undefined && (
            <span className="text-xs font-normal text-primary/50 tabular-nums">
              ({count})
            </span>
          )}
        </h6>

        {viewAllTo && (
          <Link
            to={viewAllTo}
            className="text-xs text-primary/50 hover:text-primary flex items-center gap-1 transition-colors"
          >
            View all
            <ArrowRightIcon className="w-3 h-3" />
          </Link>
        )}
      </div>

      {children}
    </section>
  );
}
