import type { ReactNode } from 'react';
import { useState } from 'react';

import { ChevronDownIcon, MapIcon } from 'lucide-react';

import { cn } from '@/shared/libs/tailwind/cn';
import { Card } from '@/shared/presentation/atoms/Card';

export default function RegionAccordion(props: Props) {
  const { regionDisplayName, regionSlug, children } = props;

  const [isOpen, setIsOpen] = useState(false);

  const cnChevronDown = cn('transition-all duration-150', {
    'rotate-180': isOpen,
  });

  return (
    <Card className="shadow-none rounded-xl">
      <button
        type="button"
        className="cursor-pointer p-2 w-full flex justify-between items-center"
        onClick={() => setIsOpen((toggle) => !toggle)}
      >
        <div className="flex items-center gap-2">
          <MapIcon className="w-6 h-6" />

          <p className="font-bold">{regionDisplayName}</p>
          <code className="text-sm">({regionSlug})</code>
        </div>

        <ChevronDownIcon className={cnChevronDown} />
      </button>

      {isOpen && <div className="p-2 border-t">{children}</div>}
    </Card>
  );
}

interface Props {
  children: ReactNode;
  regionDisplayName: string;
  regionSlug: string;
}
