import type { ReactNode } from 'react';
import { useState } from 'react';

import { ChevronDownIcon } from 'lucide-react';

import { cn } from '@/shared/libs/tailwind/cn';

import { Button } from '../../atoms/Button';
import { Card } from '../../atoms/Card';

interface Props {
  icon?: (props: { className?: string }) => ReactNode;
  title: string;
  children: ReactNode;
}

export default function CardTitledCollapsible(props: Props) {
  const { icon: Icon, children, title } = props;

  const [isCollapsed, setIsCollapsed] = useState(false);

  const cnChevron = cn('w-4 h-4 transition-all', !isCollapsed && 'rotate-180');

  return (
    <Card className="rounded-2xl">
      <div className="px-3 py-2 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          {Icon && <Icon className="w-4 h-4" />}

          <h2 className="text-lg font-bold text-primary">{title}</h2>
        </div>

        <Button
          size="xs"
          variant="outline"
          onClick={() => setIsCollapsed((v) => !v)}
        >
          <ChevronDownIcon className={cnChevron} />
        </Button>
      </div>

      {!isCollapsed && (
        <div className="p-3 flex flex-col gap-4 border-t">{children}</div>
      )}
    </Card>
  );
}
